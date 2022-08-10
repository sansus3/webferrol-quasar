<template>
  <q-page class="flex flex-start">
    <q-parallax :height="300" :speed="0.5">
      <template v-slot:media>
        <img src="~assets/parallax.webp">
      </template>
      <template v-slot:content="scope">
        <div class="absolute column items-center" :style="{
          opacity: 0.45 + (1 - scope.percentScrolled) * 0.55,
          top: (scope.percentScrolled * 50) + '%',
          left: 0,
          right: 0
        }">
          <div class="text-h3 text-white text-center">WebFerrol</div>
          <div class="text-h6 text-grey-3 text-center">
            v1.0
          </div>
        </div>
      </template>

    </q-parallax>
  </q-page>
</template>

<script setup>
import { useMeta } from 'quasar'

const metaData = {
  title: 'Programación en aplicaciones WEB | WebFerrol',
  meta: {
    description: {
      name: 'description', content: 'WebFerrol es un nombre que representa un interés personal por la formación y educación en la programación en el ámbito de las páginas y aplicaciones Web.'
    },
    keywords: { name: 'keywords', content: 'programación WEB' },
  },
  // <noscript> tags
  noscript: {
    default: 'This is content for browsers with no JS (or disabled JS)'
  }
}

useMeta(metaData);
</script>
