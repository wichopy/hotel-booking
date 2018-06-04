defmodule Hotelserver.Repo.Migrations.CreateRooms do
  use Ecto.Migration

  def change do
    create table(:rooms) do
      add :number, :integer

      timestamps()
    end

  end
end
