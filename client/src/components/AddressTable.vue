<template>
    <div id="address-table">
        <p v-if="addresses.length < 1" class="empty-table">No Addresses</p>
        <table v-else>
            <thead>
            <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
                <tr v-for="address in addresses" :key="address._id">
                    <td v-if="editing === address._id">
                        <input type="text" v-model="address.name">
                    </td>
                    <td v-else>{{address.name}}</td>
                    <td v-if="editing === address._id">
                        <input type="text" v-model="address.phone">
                    </td>
                    <td v-else>{{address.phone}}</td>
                    <td v-if="editing === address._id">
                        <input type="text" v-model="address.place">
                    </td>
                    <td v-else>{{address.place}}</td>
                    <td v-if="editing === address._id">
                        <button @click="editAddress(address)">Save</button>
                        <button class="muted-button" @click="cancelEdit(address)">Cancel</button>
                    </td>
                    <td v-else>
                        <button @click="editMode(address)">Edit</button>
                        <button @click="deleteAddress(address._id)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        name: "AddressTable.vue",
        props: {
            addresses: Array,
        },
        data(){
          return {
              editing: null,
          }
        },
        methods:{
            deleteAddress(id){
                this.$emit('delete:address', id);
            },
            editAddress(address){
                if(address.name==='' || address.phone=== '' || address.place === '' ) return;
                this.$emit('edit:address', address._id, address);
                this.editing = null;

            },
            editMode(address){
                this.cachedAddress = Object.assign({}, address);
                this.editing = address._id;
            },
            cancelEdit(address){
                Object.assign(address, this.cachedAddress);
                this.editing = null;
            },
        }
    }
</script>

<style scoped>
    button {
        margin: 0 0.5rem 0 0;
    }
</style>