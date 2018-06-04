defmodule Hotelserver.HotelTest do
  use Hotelserver.DataCase

  alias Hotelserver.Hotel

  describe "bookings" do
    alias Hotelserver.Hotel.Booking

    @valid_attrs %{check_in: "2010-04-17 14:00:00.000000Z", check_out: "2010-04-17 14:00:00.000000Z", guest_id: 42, room_id: 42, status: "some status"}
    @update_attrs %{check_in: "2011-05-18 15:01:01.000000Z", check_out: "2011-05-18 15:01:01.000000Z", guest_id: 43, room_id: 43, status: "some updated status"}
    @invalid_attrs %{check_in: nil, check_out: nil, guest_id: nil, room_id: nil, status: nil}

    def booking_fixture(attrs \\ %{}) do
      {:ok, booking} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Hotel.create_booking()

      booking
    end

    test "list_bookings/0 returns all bookings" do
      booking = booking_fixture()
      assert Hotel.list_bookings() == [booking]
    end

    test "get_booking!/1 returns the booking with given id" do
      booking = booking_fixture()
      assert Hotel.get_booking!(booking.id) == booking
    end

    test "create_booking/1 with valid data creates a booking" do
      assert {:ok, %Booking{} = booking} = Hotel.create_booking(@valid_attrs)
      assert booking.check_in == DateTime.from_naive!(~N[2010-04-17 14:00:00.000000Z], "Etc/UTC")
      assert booking.check_out == DateTime.from_naive!(~N[2010-04-17 14:00:00.000000Z], "Etc/UTC")
      assert booking.guest_id == 42
      assert booking.room_id == 42
      assert booking.status == "some status"
    end

    test "create_booking/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Hotel.create_booking(@invalid_attrs)
    end

    test "update_booking/2 with valid data updates the booking" do
      booking = booking_fixture()
      assert {:ok, booking} = Hotel.update_booking(booking, @update_attrs)
      assert %Booking{} = booking
      assert booking.check_in == DateTime.from_naive!(~N[2011-05-18 15:01:01.000000Z], "Etc/UTC")
      assert booking.check_out == DateTime.from_naive!(~N[2011-05-18 15:01:01.000000Z], "Etc/UTC")
      assert booking.guest_id == 43
      assert booking.room_id == 43
      assert booking.status == "some updated status"
    end

    test "update_booking/2 with invalid data returns error changeset" do
      booking = booking_fixture()
      assert {:error, %Ecto.Changeset{}} = Hotel.update_booking(booking, @invalid_attrs)
      assert booking == Hotel.get_booking!(booking.id)
    end

    test "delete_booking/1 deletes the booking" do
      booking = booking_fixture()
      assert {:ok, %Booking{}} = Hotel.delete_booking(booking)
      assert_raise Ecto.NoResultsError, fn -> Hotel.get_booking!(booking.id) end
    end

    test "change_booking/1 returns a booking changeset" do
      booking = booking_fixture()
      assert %Ecto.Changeset{} = Hotel.change_booking(booking)
    end
  end

  describe "guests" do
    alias Hotelserver.Hotel.Guest

    @valid_attrs %{name: "some name"}
    @update_attrs %{name: "some updated name"}
    @invalid_attrs %{name: nil}

    def guest_fixture(attrs \\ %{}) do
      {:ok, guest} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Hotel.create_guest()

      guest
    end

    test "list_guests/0 returns all guests" do
      guest = guest_fixture()
      assert Hotel.list_guests() == [guest]
    end

    test "get_guest!/1 returns the guest with given id" do
      guest = guest_fixture()
      assert Hotel.get_guest!(guest.id) == guest
    end

    test "create_guest/1 with valid data creates a guest" do
      assert {:ok, %Guest{} = guest} = Hotel.create_guest(@valid_attrs)
      assert guest.name == "some name"
    end

    test "create_guest/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Hotel.create_guest(@invalid_attrs)
    end

    test "update_guest/2 with valid data updates the guest" do
      guest = guest_fixture()
      assert {:ok, guest} = Hotel.update_guest(guest, @update_attrs)
      assert %Guest{} = guest
      assert guest.name == "some updated name"
    end

    test "update_guest/2 with invalid data returns error changeset" do
      guest = guest_fixture()
      assert {:error, %Ecto.Changeset{}} = Hotel.update_guest(guest, @invalid_attrs)
      assert guest == Hotel.get_guest!(guest.id)
    end

    test "delete_guest/1 deletes the guest" do
      guest = guest_fixture()
      assert {:ok, %Guest{}} = Hotel.delete_guest(guest)
      assert_raise Ecto.NoResultsError, fn -> Hotel.get_guest!(guest.id) end
    end

    test "change_guest/1 returns a guest changeset" do
      guest = guest_fixture()
      assert %Ecto.Changeset{} = Hotel.change_guest(guest)
    end
  end
end
