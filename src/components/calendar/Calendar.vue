<template>
    <div class="calendar-container glass-container">
        <Datepicker v-model="date"
            @update:modelValue="getEventByMonthAndYear"
            monthPicker>

            <template #trigger>
                <h1 class="calendar-title">{{ title }}</h1>
            </template>
        </Datepicker>

        <div class="calendar-days">
            <div class="calendar-day"
                v-for="day in calendarDays"
                :key="day.date"
                :class="{'has-event': day.hasEvent}">
                
                <span class="calendar-day-label">
                    {{ day.date }} {{ day.dayAbbr }}
                </span>
                <span v-if="day.hasEvent">{{ event.name }}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import Datepicker from 'vue3-date-time-picker';

    const DAYS_ABBREVIATIONS = [
        'Sun',
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat',
    ]

    export default {
        name: 'Calendar',
        components: {
            Datepicker
        },
        data() {
            const currDate = new Date()
            return {
                date: {
                    month: currDate.getMonth(),
                    year: currDate.getFullYear(),
                },
                event: null,
            }
        },

        computed: {
            calendarDays() {
                let calendarDays = []
                let indexCopy = this.startingDayAbbrIndex

                const startDate = new Date(this.event?.start_date)
                const endDate = new Date(this.event?.end_date)

                const eventMinDay = startDate.getMonth() == this.date.month ?
                    startDate.getDate() : 0

                const eventMaxDay = endDate.getMonth() == this.date.month ?
                    endDate.getDate() : 32

                for (let i = 1; i <= this.numberOfDays; i++) {
                   
                    calendarDays.push({
                        date: i,
                        dayAbbr: DAYS_ABBREVIATIONS[indexCopy],
                        hasEvent: this.event?.event_days?.includes(indexCopy) &&
                            eventMinDay <= i &&
                            eventMaxDay >= i
                    })

                    if (indexCopy == 6) {
                        indexCopy = 0
                        continue
                    }

                    indexCopy++
                }

                return calendarDays
            },

            numberOfDays() {
                const lastDayOfMonth = new Date(this.date.year, this.date.month + 1, 0)
                return lastDayOfMonth.getDate()
            },

            startingDayAbbrIndex() {
                const firstDayOfMonth = new Date(this.date.year, this.date.month, 1)
                return firstDayOfMonth.getDay()
            },

            title() {
                const date = new Date(this.date.year, this.date.month)
                const monthName = date.toLocaleString('default', { month: 'long' })
                return `${monthName} ${this.date.year}`
            },
        },

        methods: {
            getEventByMonthAndYear() {
                this.event = {}
                const apiUrl = `events/year/${this.date.year}/month/${this.date.month + 1}`
                axios.get(`${process.env.VUE_APP_API_URL}/${apiUrl}`)
                    .then(response => {
                        this.event = response.data.data
                    })
            }
        },

        mounted() {
            this.getEventByMonthAndYear()
            this.emitter.on('event-created', event => {
                this.event = event
            });
        }
    }
</script>

<style lang="scss" scoped>
    .calendar-title {
        display: inline-block;
        cursor: pointer;
        border-radius: 5px;
        margin: 0 0 .5rem;
    }

    .calendar-title {
        &:hover {
            background: lightblue;
        }
    }

    .calendar-day {
        display: flex;
        border-bottom: 1px solid #ddd;
        padding: 1rem 0;

        &:last-child {
            border-bottom: 0;
        }
    }

    .calendar-day-label {
        margin: 0 1rem 0;
        min-width: 100px;
    }

    .calendar-day.has-event {
        background: lightgreen;
    }
</style>
