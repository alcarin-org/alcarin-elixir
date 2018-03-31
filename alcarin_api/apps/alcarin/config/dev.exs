use Mix.Config

# Configure your database
config :alcarin, Alcarin.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "alcarin",
  password: "alcarin",
  database: "alcarin",
  hostname: "postgres.link",
  pool_size: 10
