defmodule Hotelserver.Repo.Migrations.CreateBookings do
  use Ecto.Migration

  def change do
    create table(:bookings) do
      add :check_in, :utc_datetime
      add :check_out, :utc_datetime
      add :status, :string
      add :guest_id, :integer
      add :room_id, :integer

      timestamps()
    end

  end
end
