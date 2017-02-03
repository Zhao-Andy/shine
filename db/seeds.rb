# Helper method to create a billing address for a customer
def create_billing_address(customer_id,state)
  billing_address = Address.create!(
     street: Faker::Address.street_address,
       city: Faker::Address.city,
      state: state,
    zipcode: Faker::Address.zip
  )

  CustomersBillingAddress.create!(customer_id: customer_id,
                                      address: billing_address)
end

# Helper method to create a shipping address for a customer
def create_shipping_address(customer_id,state,is_primary)
  shipping_address = Address.create!(
       street: Faker::Address.street_address,
         city: Faker::Address.city,
        state: state,
      zipcode: Faker::Address.zip
  )

  CustomersShippingAddress.create!(customer_id: customer_id,
                                       address: shipping_address,
                                       primary: is_primary)

end

# Cache the number of states so we don't have to query
# ecah time through
all_states = State.all.to_a

# For all customers
Customer.find_each do |customer|
  # Do not recreate addresses if this customer has them
  next if customer.customers_shipping_address.any?
  puts "Creating addresses for #{customer.id}..."

  # Create a billing address for them
  create_billing_address(customer.id,all_states.sample)

  # Create a random number of shipping addresses, making
  # sure we create at least 1
  num_shipping_addresses = rand(4) + 1

  num_shipping_addresses.times do |i|
    # Create the shipping address, setting the first one
    # we create as the "primary"
    create_shipping_address(customer.id,all_states.sample,i == 0)
  end
end
