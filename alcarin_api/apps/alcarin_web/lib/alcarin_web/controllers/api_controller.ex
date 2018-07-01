defmodule AlcarinWeb.ApiController do
  use AlcarinWeb, :controller

  def test do
    case {:error, "test"} do
      {:ok} -> {:ok, "success"}
      default -> default
    end
  end

  def index(conn, %{"wot" => wot}) do
    IO.puts inspect test()
    conn
      |> put_status(:not_found)
      # |> put_flash(:info, "Welcome to Phoenix, from flash info!")
      |> json(%{test: wot})
  end
end
