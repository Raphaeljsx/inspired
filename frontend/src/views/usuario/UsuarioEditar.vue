<script setup>
import UsuarioForm from '@/components/UsuarioForm.vue'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import { api } from '../../utils/services'

const store = useAuthStore()
const router = useRouter()

onMounted(() => {
  document.title = 'Usuário | Editar'
})

const getHeaders = () => ({
  Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}` || ''
})

function atualizarUsuario() {
  api
    .put(
      `/usuario/${store.usuario.id}`,
      { ...store.usuario, token: undefined, login: undefined },
      { headers: getHeaders() }
    )
    .then(() => {
      store.updateUsuario(store.usuario)
      router.push({ name: 'usuario' })
    })
    .catch((error) => {
      console.log(error.response)
    })
}
</script>

<template>
  <section>
    <UsuarioForm>
      <button class="btn" @click.prevent="atualizarUsuario">Atualizar Dados</button>
    </UsuarioForm>
  </section>
</template>

<style scoped></style>
