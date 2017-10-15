FROM elixir:1.5

RUN mix local.hex --force && \
    mix archive.install --force https://github.com/phoenixframework/archives/raw/master/phx_new-1.3.0.ez && \
    mix do local.rebar

RUN apt-get update && \
    apt-get install -y postgresql-client
