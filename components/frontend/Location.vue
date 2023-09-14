<template>
    <div>
        <section id="location">
            <b-container>
                <b-row class="row justify-content-center">
                    <b-col lg="7" md="10" class="text-center">
                        <div class="section-heading center">
                            <h2>Find By Locations</h2>
                            <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores</p>
                        </div>
                    </b-col>
                </b-row>

                <b-row>
                    <b-col lg="4" md="4">
                        <div class="location-property">
                            <div class="location-property-img">
                                <b-link>
                                    <img src="https://resido.thesky9.com/storage/cities/c-1-400xauto.png"/>
                                </b-link>
                            </div>

                            <div class="location-property-content">
                                <div class="content-flex">
                                    <h4 class="content-flex-title">Newark</h4>
                                    <span>2 Properties</span>
                                </div>
                                <div class="content-right">
                                    <nuxt-link
                                        class="content-right-view"
                                        :to="{ name: 'location-city',
                                        params: { userId: 1253 }}">
                                            <font-awesome-icon icon="fa-solid fa-angle-right" />
                                    </nuxt-link>
                                </div>
                            </div>
                        </div>
                    </b-col>
                    <b-col lg="4" md="4">
                        <div class="location-property">
                            <div class="location-property-img">
                                <b-link>
                                    <img src="https://resido.thesky9.com/storage/cities/c-2-400xauto.png"/>
                                </b-link>
                            </div>

                            <div class="location-property-content">
                                <div class="content-flex">
                                    <h4 class="content-flex-title">Peoria</h4>
                                    <span>6 Properties</span>
                                </div>
                                <div class="content-right">
                                    <b-link class="content-right-view">
                                        <font-awesome-icon icon="fa-solid fa-angle-right" />
                                    </b-link>
                                </div>
                            </div>
                        </div>
                    </b-col>
                    <b-col lg="4" md="4">
                        <div class="location-property">
                            <div class="location-property-img">
                                <b-link>
                                    <img src="https://resido.thesky9.com/storage/cities/c-3-400xauto.png"/>
                                </b-link>
                            </div>

                            <div class="location-property-content">
                                <div class="content-flex">
                                    <h4 class="content-flex-title">O'Fallon</h4>
                                    <span>3 Properties</span>
                                </div>
                                <div class="content-right">
                                    <b-link class="content-right-view">
                                        <font-awesome-icon icon="fa-solid fa-angle-right" />
                                    </b-link>
                                </div>
                            </div>
                        </div>
                    </b-col>
                    <b-col lg="4" md="4">
                        <div class="location-property">
                            <div class="location-property-img">
                                <b-link>
                                    <img src="https://resido.thesky9.com/storage/cities/c-4-400xauto.png"/>
                                </b-link>
                            </div>

                            <div class="location-property-content">
                                <div class="content-flex">
                                    <h4 class="content-flex-title">Hampton</h4>
                                    <span>3 Properties</span>
                                </div>
                                <div class="content-right">
                                    <b-link class="content-right-view">
                                        <font-awesome-icon icon="fa-solid fa-angle-right" />
                                    </b-link>
                                </div>
                            </div>
                        </div>
                    </b-col>
                    <b-col lg="4" md="4">
                        <div class="location-property">
                            <div class="location-property-img">
                                <b-link>
                                    <img src="https://resido.thesky9.com/storage/cities/c-5-400xauto.png"/>
                                </b-link>
                            </div>

                            <div class="location-property-content">
                                <div class="content-flex">
                                    <h4 class="content-flex-title">Lakewood</h4>
                                    <span>3 Properties</span>
                                </div>
                                <div class="content-right">
                                    <b-link class="content-right-view">
                                        <font-awesome-icon icon="fa-solid fa-angle-right" />
                                    </b-link>
                                </div>
                            </div>
                        </div>
                    </b-col>
                    <b-col lg="4" md="4">
                        <div class="location-property">
                            <div class="location-property-img">
                                <b-link>
                                  <img src="https://resido.thesky9.com/storage/cities/c-6-400xauto.png"/>
                                </b-link>
                            </div>

                            <div class="location-property-content">
                                <div class="content-flex">
                                    <h4 class="content-flex-title">Mesa</h4>
                                    <span>0 Properties</span>
                                </div>
                                <div class="content-right">
                                    <b-link class="content-right-view">
                                        <font-awesome-icon icon="fa-solid fa-angle-right" />
                                    </b-link>
                                </div>
                            </div>
                        </div>
                    </b-col>
                </b-row>

                <b-row>
                    <b-col lg="12" md="12" sm="12" class="text-center">
                        <b-link class="btn btn-browse-more">Browse More Properties</b-link>
                    </b-col>
                </b-row>
            </b-container>
        </section>
    </div>
</template>

<script>
    export default {
        name: "Location"
    }
</script>

<style scoped>

</style>
