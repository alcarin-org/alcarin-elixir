defmodule AlcarinApiWeb.TestView do
  use AlcarinApiWeb, :view

  def render("index.json", %{test: test}) do
    %{test: test}
  end
end
