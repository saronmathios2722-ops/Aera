import { execSync } from 'child_process';

export function query(sql: string, params: any[] = []): any {
  try {
    let finalSql = sql;
    // Correctly handle multiple placeholders
    for (const param of params) {
      const value = typeof param === 'string' ? `'${param.replace(/'/g, "''")}'` : param;
      finalSql = finalSql.replace('?', value);
    }

    const output = execSync(`team-db "${finalSql.replace(/"/g, '\\"')}"`, { encoding: 'utf8' });
    return JSON.parse(output);
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

export const db = {
  query,
  users: {
    getById: (id: string) => query(`SELECT * FROM users WHERE id = ?`, [id])[0],
    getByEmail: (email: string) => query(`SELECT * FROM users WHERE email = ?`, [email])[0],
    create: (user: { id: string, email: string, name?: string, image?: string }) =>
      query(`INSERT INTO users (id, email, name, image) VALUES (?, ?, ?, ?)`, [user.id, user.email, user.name || '', user.image || '']),
  },
  profiles: {
    getById: (userId: string) => query(`SELECT * FROM user_profiles WHERE user_id = ?`, [userId])[0],
    create: (userId: string) => query(`INSERT INTO user_profiles (user_id) VALUES (?)`, [userId]),
    update: (userId: string, data: any) => {
      const sets = Object.entries(data)
        .map(([key, value]) => {
          let formattedValue = value;
          if (typeof value === 'string') {
            formattedValue = `'${value.replace(/'/g, "''")}'`;
          } else if (value === null) {
            formattedValue = 'NULL';
          } else if (typeof value === 'boolean') {
            formattedValue = value ? 1 : 0;
          }
          return `${key} = ${formattedValue}`;
        })
        .join(', ');
      return query(`UPDATE user_profiles SET ${sets}, updated_at = CURRENT_TIMESTAMP WHERE user_id = ?`, [userId]);
    }
  },
  purchases: {
    getById: (id: string) => query(`SELECT * FROM purchases WHERE id = ?`, [id])[0],
    getByUser: (userId: string) => query(`SELECT * FROM purchases WHERE user_id = ? ORDER BY created_at DESC`, [userId]),
    create: (data: { id: string, user_id: string, item_name: string, price: number, url?: string, image_url?: string, cooldown_until?: string, style_fit_score?: number, discovery_id?: string }) => {
      return query(`INSERT INTO purchases (id, user_id, item_name, price, url, image_url, cooldown_until, style_fit_score, discovery_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
        [data.id, data.user_id, data.item_name, data.price, data.url || '', data.image_url || '', data.cooldown_until || null, data.style_fit_score || null, data.discovery_id || null]);
    },
    updateStatus: (id: string, status: string, reflective_answer?: string) => {
      if (reflective_answer) {
        return query(`UPDATE purchases SET status = ?, reflective_answer = ? WHERE id = ?`, [status, reflective_answer, id]);
      }
      return query(`UPDATE purchases SET status = ? WHERE id = ?`, [status, id]);
    }
  }
};
