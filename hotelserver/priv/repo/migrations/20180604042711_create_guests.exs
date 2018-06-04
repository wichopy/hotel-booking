defmodule Hotelserver.Repo.Migrations.CreateGuests do
  use Ecto.Migration

  def change do
    create table(:guests) do
      add :name, :string

      timestamps()
    end

  end
end
