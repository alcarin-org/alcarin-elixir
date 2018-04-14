defmodule AlcarinWeb.CharacterFeedChannel do
  use Phoenix.Channel

  def join("character-feed:lobby", _message, socket) do
    {:ok, %{test:  5}, socket}
  end

  def join("character-feed:" <> _character_id, _params, _socket) do
    {:error, %{reason: "unauthorized"}}
  end

  def handle_in("msg", %{"msg" => new_msg}, socket) do
    IO.puts new_msg
    {:noreply, socket}
  end
end
