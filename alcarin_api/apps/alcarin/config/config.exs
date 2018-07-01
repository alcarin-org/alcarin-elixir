use Mix.Config

config :alcarin, ecto_repos: [Alcarin.Repo]

import_config "#{Mix.env()}.exs"
