FROM elixir:1.6.4
# inotify-tools
RUN apt-get update && \
    apt-get install -y postgresql-client inotify-tools

RUN mix local.hex --force && \
    mix local.rebar --force
