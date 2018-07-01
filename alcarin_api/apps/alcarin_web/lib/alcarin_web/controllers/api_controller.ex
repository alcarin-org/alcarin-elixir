defmodule AlcarinWeb.ApiController do
  use AlcarinWeb, :controller

  def test do
    case {:error, "test"} do
      {:ok} -> {:ok, "success"}
      default -> default
    end
  end

  def index(conn, %{"wot" => wot}) do
    conn
    |> put_status(:not_found)
    |> json(%{test: wot})
  end
end
