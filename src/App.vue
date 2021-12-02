<template>
    <div class="app-container container">
        <create-event-form></create-event-form>
        <calendar></calendar>
    </div>
</template>

<script>
    import Calendar from './components/calendar/Calendar.vue'
    import CreateEventForm from './components/calendar/CreateEventForm.vue'
    
    export default {
        name: 'App',
        components: {
            Calendar,
            CreateEventForm
        }
    }
</script>

<style lang="scss">
    @import "./assets/less/base.scss";
    @import "./assets/less/app.scss";

    .app-container {
        display: grid;
        grid-template-columns: 1fr;
        row-gap: 2rem;
        box-sizing: border-box;
        margin: 2rem auto;
    }

    @media (min-width: 767px) {
        .app-container {
            grid-template-columns: 30% auto;
            column-gap: 2rem;
            row-gap: 0;
            align-items: baseline;
        }
    }
</style>