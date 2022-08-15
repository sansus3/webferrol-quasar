<template>
    <div class="q-pa-md">
        <q-card style="width: 300px" bordered v-for="(item, index) in 8" :key="index">
            <q-card-section>
                <q-list>
                    <q-item>
                        <q-item-section>
                            <q-item-label>
                                <q-skeleton type="text" />
                            </q-item-label>
                            <q-item-label caption>
                                <q-skeleton type="text" />
                            </q-item-label>
                        </q-item-section>
                    </q-item>
                </q-list>
            </q-card-section>

            <q-skeleton height="200px" square />
        </q-card>
    </div>
</template>