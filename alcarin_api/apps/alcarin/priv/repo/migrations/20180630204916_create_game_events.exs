defmodule Alcarin.Repo.Migrations.CreateGameEvents do
  use Ecto.Migration

  def change do
    create table(:game_events, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :type, :text
      add :args, :map

      timestamps()
    end

  end
end
