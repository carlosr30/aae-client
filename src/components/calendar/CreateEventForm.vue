<template>
    <div class="create-event-form-container glass-container">
        <form @submit.prevent="save()">
            <h1 class="create-event-form-title">Create Event</h1>
        
            <div class="site-input-container">
                <label class="site-label">Event</label>
                <input type="text"
                    class="site-input"
                    v-model="name" />

                <span class="site-input-error" v-if="errors.name">
                    {{ errors.name[0] }}
                </span>
            </div>

            <div class="site-input-container">
                <label class="site-label">Range</label>
                <Datepicker 
                    :enableTimePicker="false"
                    v-model="dateRange"
                    range />

                <span class="site-input-error" v-if="errors.start_date">
                    {{ errors.start_date[0] }}
                </span>

                <span class="site-input-error" v-if="!errors.start_date && errors.end_date">
                    {{ errors.end_date[0] }}
                </span>
            </div>

            <div class="days-checkboxes-container">
                <div class="site-checkbox-container">
                    <label>
                        <input type="checkbox"
                            class="site-checkbox"
                            value="1"
                            v-model="eventDays" />

                        <span>Monday</span>
                    </label>
                </div>

                <div class="site-checkbox-container">
                    <label>
                        <input type="checkbox"
                            class="site-checkbox"
                            value="2"
                            v-model="eventDays" />

                        <span>Tuesday</span>
                    </label>
                </div>

                <div class="site-checkbox-container">
                    <label>
                        <input type="checkbox"
                            class="site-checkbox"
                            value="3"
                            v-model="eventDays" />

                        <span>Wednesday</span>
                    </label>
                </div>

                <div class="site-checkbox-container">
                    <label>
                        <input type="checkbox"
                            class="site-checkbox"
                            value="4"
                            v-model="eventDays" />

                        <span>Thursday</span>
                    </label>
                </div>
                
                <div class="site-checkbox-container">
                    <label>
                        <input type="checkbox"
                            class="site-checkbox"
                            value="5"
                            v-model="eventDays" />

                        <span>Friday</span>
                    </label>
                </div>

                <div class="site-checkbox-container">
                    <label>
                        <input type="checkbox"
                            class="site-checkbox"
                            value="6"
                            v-model="eventDays" />

                        <span>Saturday</span>
                    </label>
                </div>

                <div class="site-checkbox-container">
                    <label>
                        <input type="checkbox"
                            class="site-checkbox"
                            value="0"
                            v-model="eventDays" />

                        <span>Sunday</span>
                    </label>

                    <span class="site-input-error" v-if="errors.event_days">
                        {{ errors.event_days[0] }}
                    </span>
                </div>
            </div>

            <button class="btn" type="submit">
                Save +
            </button>
        </form>
    </div>
</template>

<script>
    import axios from 'axios'
    import Datepicker from 'vue3-date-time-picker';
    import 'vue3-date-time-picker/dist/main.css';

    export default {
        name: 'CreateEventForm',
        components: { Datepicker },
        data() {
            return {
                name: '',
                dateRange: {},
                eventDays: [],
                errors: {}
            }
        },

        methods: {
            save() {
                axios.post(`${process.env.VUE_APP_API_URL}/events`, {
                    'name': this.name,
                    'start_date': this.dateRange[0] || '',
                    'end_date': this.dateRange[1] || '',
                    'event_days': this.eventDays
                }).then(() => {
                    let eventDaysInt = this.eventDays.map(eventDay => {
                        return parseInt(eventDay)
                    })

                    this.emitter.emit('event-created', {
                        'name': this.name,
                        'start_date': this.dateRange[0].toISOString().substring(0, 10),
                        'end_date': this.dateRange[1].toISOString().substring(0, 10),
                        'event_days': eventDaysInt
                    });

                    this.$swal({
                        title: "Event successfully saved",
                        toast: true,
                        position: 'top-end',
                        timer: 5000,
                        showConfirmButton: false
                    });

                    this.errors = {}
                    this.name = ''
                    this.dateRange = {}
                    this.eventDays = []
                }).catch(error => {
                    switch (error.response.status) {
                        case 422:
                            this.errors = error.response.data.errors
                            break

                        default:
                            alert('Error')
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .create-event-form-title {
        margin: 0 0 16px;
    }

    .date-inputs-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        column-gap: 16px;
    }
</style>
