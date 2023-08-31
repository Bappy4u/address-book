<template>
  <div id="app" class="small-container">
    <h1>Address Book</h1>
    <address-form @add:address="addAddress"/>
    <address-table @edit:address="editAddress" @delete:address="deleteAddress" :addresses = 'addresses'/>
  </div>
</template>

<script>

  import AddressTable from '@/components/AddressTable.vue'
  import AddressForm from '@/components/AddressForm.vue'

  export default {
    name: 'app',

    components: {
      AddressTable,
      AddressForm,
    },
    data(){
      return{
        addresses: [

        ]
      }
    },
    methods: {


      async getAddresses() {
        try {
          const response = await fetch('http://localhost:3000/address/all');
          const data = await response.json();
          this.addresses = data;
        } catch (error) {
          console.error(error)
        }
      },
      async addAddress(address) {
        try {
          const response = await fetch('http://localhost:3000/address/add-record', {
            method: 'POST',
            body: JSON.stringify(address),
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
          });
          const data = await response.json();
          this.addresses = [...this.addresses, data]
        } catch (error) {
          console.error(error)
        }
        },
      async editAddress(id, updatedAddress) {
        try {
          console.log(`http://localhost:3000/address/${id}`);
          const response = await fetch(`http://localhost:3000/address/${id}`, {
            method: 'PUT',
            body: JSON.stringify(updatedAddress),
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
          })
          const data = await response.json();
          this.addresses = this.addresses.map(address => (address.id === id ? data : address))
        } catch (error) {
          console.error(error)
        }
      },
      async deleteAddress(id) {
        try {
          await fetch(`http://localhost:3000/address/${id}`, {
            method: "DELETE"
          });
          this.addresses = this.addresses.filter(address => address._id !== id);
        } catch (error) {
          console.error(error);
        }
      },
    },
    mounted() {
      this.getAddresses()
    },
  }
</script>

<style>
  button {
    background: #009435;
    border: 1px solid #009435;
  }

  .small-container {
    max-width: 680px;
  }
</style>