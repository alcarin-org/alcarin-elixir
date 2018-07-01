defmodule Alcarin.Application do
  @moduledoc """
  The Alcarin Application Service.

  The alcarin system business domain lives in this application.

  Exposes API to clients such as the `AlcarinWeb` application
  for use in channels, controllers, and elsewhere.
  """
  use Application

  def start(_type, _args) do
    import Supervisor.Spec, warn: false

    Supervisor.start_link(
      [
        supervisor(Alcarin.Repo, [])
      ],
      strategy: :one_for_one,
      name: Alcarin.Supervisor
    )
  end
end
