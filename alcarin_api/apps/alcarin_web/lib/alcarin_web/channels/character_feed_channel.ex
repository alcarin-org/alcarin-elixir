defmodule AlcarinWeb.CharacterFeedChannel do
  use AlcarinWeb, :channel

  alias Alcarin.GameEvents

  def join("character-feed:lobby", _message, socket) do
    {:ok, %{test: 5}, socket}
  end

  def join("character-feed:" <> _character_id, _params, _socket) do
    {:error, %{reason: "unauthorized"}}
  end

  def handle_in("communication:say", %{"content" => new_msg}, socket) do
    case GameEvents.create_speak_event(new_msg) do
      {:ok, _game_event} ->
        {:reply, :ok, socket}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:reply, {:error, %{errors: parse_changeset_errors(changeset)}}, socket}
    end
  end

  def handle_in(_, _, socket) do
    {:reply, {:error, %{error: "Unknown message type"}}, socket}
  end
end
