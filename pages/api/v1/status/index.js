import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  response.status(200).json({
    updated_at: updatedAt
  });
}

export default status;

/* 
1. Versão do Postgres;
2. Conexões máximas;
3. Conexões usadas;
*/
