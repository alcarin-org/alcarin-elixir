FROM elixir:1.6.4

RUN apt-get update && \
    apt-get install -y postgresql-client

RUN mix local.hex --force && \
    mix local.rebar --force
    # mix archive.install --force https://github.com/phoenixframework/archives/raw/master/phx_new-1.3.2.ez && \

