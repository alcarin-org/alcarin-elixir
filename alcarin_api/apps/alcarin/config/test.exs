use Mix.Config

# Configure your database
config :alcarin, Alcarin.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "alcarin",
  password: "alcarin",
  database: "alcarin_test",
  hostname: "postgres.link",
  pool: Ecto.Adapters.SQL.Sandbox
