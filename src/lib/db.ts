import { execSync } from 'child_process';

export function query(sql: string): any {
  try {
    const output = execSync(`team-db "${sql.replace(/"/g, '\\"')}"`, { encoding: 'utf8' });
    return JSON.parse(output);
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

export const db = {
  query,
  users: {
    getById: (id: string) => query(`SELECT * FROM users WHERE id = '${id}'`)[0],
    getByEmail: (email: string) => query(`SELECT * FROM users WHERE email = '${email}'`)[0],
    create: (user: { id: string, email: string, name?: string, image?: string }) => 
      query(`INSERT INTO users (id, email, name, image) VALUES ('${user.id}', '${user.email}', '${(user.name || '').replace(/'/g, "''")}', '${(user.image || '').replace(/'/g, "''")}')`),
  },
  profiles: {
    getById: (userId: string) => query(`SELECT * FROM user_profiles WHERE user_id = '${userId}'`)[0],
    create: (userId: string) => query(`INSERT INTO user_profiles (user_id) VALUES ('${userId}')`),
    update: (userId: string, data: any) => {
      const sets = Object.entries(data)
        .map(([key, value]) => {
          let formattedValue = value;
          if (typeof value === 'string') {
            formattedValue = `'${value.replace(/'/g, "''")}'`;
          } else if (value === null) {
            formattedValue = 'NULL';
          }
          return `${key} = ${formattedValue}`;
        })
        .join(', ');
      return query(`UPDATE user_profiles SET ${sets}, updated_at = CURRENT_TIMESTAMP WHERE user_id = '${userId}'`);
    }
  }
};
