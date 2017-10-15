# In web/controllers/todo_controller.ex
defmodule AlcarinApiWeb.TestController do
  use AlcarinApiWeb, :controller

  def index(conn, _params) do
    render conn, "index.json", test: "test-me"
  end
end
