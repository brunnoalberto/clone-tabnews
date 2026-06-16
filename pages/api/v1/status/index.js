import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();
  const databaseVersionResult = await database.query("SHOW server_version;")
  const databaseVersionValue = databaseVersionResult.rows[0].server_version;
  const maxConnectionsResult = await database.query("SHOW max_connections;");
  const maxConnectionsValue = maxConnectionsResult.rows[0].max_connections;
  const activeConnectionsResult = await database.query("SELECT count(*) AS active_connections FROM pg_stat_activity WHERE state = 'active';");
  const activeConnectionsValue = activeConnectionsResult.rows[0].active_connections;

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: databaseVersionValue,
        max_connections: maxConnectionsValue,
        active_connections: activeConnectionsValue,
      },
    },
  });
}

export default status;
