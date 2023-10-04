<template>
  <div class="container mt-4">
    <h2>{{ modoEdicion ? 'Editar Producto' : 'Agregar Producto' }}</h2>
    <form @submit.prevent="modoEdicion ? actualizarProducto() : agregarProducto()">
      <div class="row">
        <div class="col-4">
          <label for="nombre">Nombre del Producto:</label>
          <input type="text" id="nombre" v-model="nombre" required class="form-control">
        </div>
        <div class="col-4">
          <label for="precio">Precio:</label>
          <input type="number" id="precio" v-model="precio" required class="form-control">
        </div>
        <div class="col-4">
          <label for="stock">Stock:</label>
          <input type="number" id="stock" v-model="stock" required class="form-control">
        </div>
        <div class="col-4 mt-2">
          <button type="submit" class="btn" :class="[modoEdicion ? 'btn-warning' : 'btn-success']">
            {{ modoEdicion ? 'Actualizar Producto' : 'Agregar Producto' }}
          </button>
        </div>
      </div>
    </form>
    <table class="table">
      <thead>
      <tr>
        <th scope="col">Nombre</th>
        <th scope="col">Precio</th>
        <th scope="col">Stock</th>
        <th scope="col">Acciones</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in items" :key="item.id">
        <td>{{ item.nombre }}</td>
        <td>{{ item.precio }}</td>
        <td>{{ item.stock }}</td>
        <td>
          <button class="btn btn-warning m-2" @click="editarProducto(item)">Editar</button>
          <button class="btn btn-danger" @click="eliminarProducto(item.id)">Eliminar</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {collection, getDocs, addDoc, doc, updateDoc, deleteDoc} from 'firebase/firestore';
import {db} from '@/firebaseConfig'; // Importa la instancia de Firestore correctamente

export default {
  data() {
    return {
      items: [],
      nombre: '',
      precio: '',
      stock: '',
      productoId: null, // Agregamos una propiedad para mantener el ID del producto en edición
      modoEdicion: false, // Agregamos una propiedad para controlar el modo de edición
    };
  },
  created() {
    this.listarProductos();
  },
  methods: {
    async listarProductos() {
      const querySnapshot = await getDocs(collection(db, 'productos'));
      this.items = querySnapshot.docs.map((doc) => {
        return {id: doc.id, ...doc.data()};
      });
    },
    async agregarProducto() {
      try {
        const producto = {
          nombre: this.nombre,
          precio: this.precio,
          stock: this.stock,
        };

        await addDoc(collection(db, 'productos'), producto);

        // Limpiar los campos del formulario
        this.nombre = '';
        this.precio = '';
        this.stock = '';

        // Luego de agregar, actualiza la lista de productos
        this.listarProductos();
      } catch (error) {
        console.error('Error al agregar el producto: ', error);
      }
    },
    async editarProducto(item) {
      // Cuando se hace clic en el botón "Editar", se llenan los campos del formulario
      this.nombre = item.nombre;
      this.precio = item.precio;
      this.stock = item.stock;
      this.productoId = item.id;
      this.modoEdicion = true;
    },
    async actualizarProducto() {
      try {
        const productoActualizado = {
          nombre: this.nombre,
          precio: this.precio,
          stock: this.stock,
        };

        // Actualiza el documento en Firestore utilizando el ID del producto en edición
        await updateDoc(doc(db, 'productos', this.productoId), productoActualizado);

        // Limpiar los campos del formulario y restablecer el modo de edición
        this.nombre = '';
        this.precio = '';
        this.stock = '';
        this.productoId = null;
        this.modoEdicion = false;

        // Luego de actualizar, actualiza la lista de productos
        this.listarProductos();
      } catch (error) {
        console.error('Error al actualizar el producto: ', error);
      }
    },
    async eliminarProducto(id) {
      try {
        // Elimina el documento en Firestore utilizando el ID del producto
        await deleteDoc(doc(db, 'productos', id));

        // Luego de eliminar, actualiza la lista de productos
        this.listarProductos();
      } catch (error) {
        console.error('Error al eliminar el producto: ', error);
      }
    },
  }
}
</script>