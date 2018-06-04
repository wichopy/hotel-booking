defmodule HotelserverWeb.BookingControllerTest do
  use HotelserverWeb.ConnCase

  alias Hotelserver.Hotel
  alias Hotelserver.Hotel.Booking

  @create_attrs %{check_in: "2010-04-17 14:00:00.000000Z", check_out: "2010-04-17 14:00:00.000000Z", guest_id: 42, room_id: 42, status: "some status"}
  @update_attrs %{check_in: "2011-05-18 15:01:01.000000Z", check_out: "2011-05-18 15:01:01.000000Z", guest_id: 43, room_id: 43, status: "some updated status"}
  @invalid_attrs %{check_in: nil, check_out: nil, guest_id: nil, room_id: nil, status: nil}

  def fixture(:booking) do
    {:ok, booking} = Hotel.create_booking(@create_attrs)
    booking
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all bookings", %{conn: conn} do
      conn = get conn, booking_path(conn, :index)
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create booking" do
    test "renders booking when data is valid", %{conn: conn} do
      conn = post conn, booking_path(conn, :create), booking: @create_attrs
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get conn, booking_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "check_in" => "2010-04-17 14:00:00.000000Z",
        "check_out" => "2010-04-17 14:00:00.000000Z",
        "guest_id" => 42,
        "room_id" => 42,
        "status" => "some status"}
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post conn, booking_path(conn, :create), booking: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update booking" do
    setup [:create_booking]

    test "renders booking when data is valid", %{conn: conn, booking: %Booking{id: id} = booking} do
      conn = put conn, booking_path(conn, :update, booking), booking: @update_attrs
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get conn, booking_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "check_in" => "2011-05-18 15:01:01.000000Z",
        "check_out" => "2011-05-18 15:01:01.000000Z",
        "guest_id" => 43,
        "room_id" => 43,
        "status" => "some updated status"}
    end

    test "renders errors when data is invalid", %{conn: conn, booking: booking} do
      conn = put conn, booking_path(conn, :update, booking), booking: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete booking" do
    setup [:create_booking]

    test "deletes chosen booking", %{conn: conn, booking: booking} do
      conn = delete conn, booking_path(conn, :delete, booking)
      assert response(conn, 204)
      assert_error_sent 404, fn ->
        get conn, booking_path(conn, :show, booking)
      end
    end
  end

  defp create_booking(_) do
    booking = fixture(:booking)
    {:ok, booking: booking}
  end
end
