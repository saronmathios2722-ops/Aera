import { createClient } from '@libsql/client';

const url = process.env.TEAM_DB_URL || 'file:local.db';
const authToken = process.env.TEAM_DB_AUTH_TOKEN || '';

const client = createClient({
  url,
  authToken,
});

export async function query(sql: string, params: any[] = []): Promise<any> {
  try {
    const result = await client.execute({
      sql,
      args: params,
    });
    // Return rows as an array of objects
    return result.rows;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

export const db = {
  query,
  users: {
    getById: async (id: string) => (await query(`SELECT * FROM users WHERE id = ?`, [id]))[0],
    getByEmail: async (email: string) => (await query(`SELECT * FROM users WHERE email = ?`, [email]))[0],
    create: async (user: { id: string, email: string, name?: string, image?: string }) =>
      await query(`INSERT INTO users (id, email, name, image) VALUES (?, ?, ?, ?)`, [user.id, user.email, user.name || '', user.image || '']),
  },
  profiles: {
    getById: async (userId: string) => (await query(`SELECT * FROM user_profiles WHERE user_id = ?`, [userId]))[0],
    create: async (userId: string) => await query(`INSERT INTO user_profiles (user_id) VALUES (?)`, [userId]),
    update: async (userId: string, data: any) => {
      const entries = Object.entries(data).filter(([_, v]) => v !== undefined);
      const sets = entries
        .map(([key]) => `${key} = ?`)
        .join(', ');
      const values = entries.map(([_, v]) => v);
      values.push(userId);
      return await query(`UPDATE user_profiles SET ${sets}, updated_at = CURRENT_TIMESTAMP WHERE user_id = ?`, values);
    }
  },
  purchases: {
    getById: async (id: string) => (await query(`SELECT * FROM purchases WHERE id = ?`, [id]))[0],
    getByUser: async (userId: string) => await query(`SELECT * FROM purchases WHERE user_id = ? ORDER BY created_at DESC`, [userId]),
    create: async (data: { id: string, user_id: string, item_name: string, price: number, url?: string, image_url?: string, cooldown_until?: string, style_fit_score?: number, discovery_id?: string }) => {
      return await query(`INSERT INTO purchases (id, user_id, item_name, price, url, image_url, cooldown_until, style_fit_score, discovery_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
        [data.id, data.user_id, data.item_name, data.price, data.url || '', data.image_url || '', data.cooldown_until || null, data.style_fit_score || null, data.discovery_id || null]);
    },
    updateStatus: async (id: string, status: string, reflective_answer?: string) => {
      if (reflective_answer) {
        return await query(`UPDATE purchases SET status = ?, reflective_answer = ? WHERE id = ?`, [status, reflective_answer, id]);
      }
      return await query(`UPDATE purchases SET status = ? WHERE id = ?`, [status, id]);
    }
  }
};
