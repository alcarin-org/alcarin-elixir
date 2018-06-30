# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :alcarin_web,
  namespace: AlcarinWeb,
  ecto_repos: [Alcarin.Repo],
  generators: [binary_id: true]

# Configures the endpoint
config :alcarin_web, AlcarinWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "p8XNUn3lCMHRTXOJ1/zcJR1W7wV7HnGiufrezgBQGPGL4KDAhjX/QaiauFZ2M40t",
  render_errors: [view: AlcarinWeb.ErrorView, accepts: ~w(json)],
  pubsub: [name: AlcarinWeb.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

config :alcarin_web, :generators,
  context_app: :alcarin,
  binary_id: true

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
