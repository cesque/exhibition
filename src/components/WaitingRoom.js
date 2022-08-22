import humanizeDuration from 'humanize-duration'
import { DateTime } from 'luxon'
import { useEffect, useState } from 'react'
import styles from './WaitingRoom.module.scss'

export default function WaitingRoom({ openingTime }) {
    let [now, setNow] = useState(DateTime.now())

    let minutesLeft = openingTime.diff(now).shiftTo('minutes').get('minute')

    if(now > openingTime) window.location.reload()

    const humaniseOptions = {
        units: ['d', 'h', 'm'],
        round: true,
    }

    useState(() => {
        let interval = setInterval(() => {
            setNow(() => DateTime.now())
        }, 4000)


        return () => clearInterval(interval)
    }, [])

    let timerText = minutesLeft < 1 ? 'Please wait. Your page will refresh when the exhibition opens.' : `The exhibition will open in ${ humanizeDuration(openingTime.diff(now).valueOf(), humaniseOptions) }.`

    return <div className={ styles.waitingRoom }>
        <div className={ styles.header }>
            <div className={ styles.title }><span className={ styles.pride }>Pride</span> / Monochrome</div>
            <div className={ styles.date }>{ openingTime.toLocaleString() }</div>
        </div>

        <div className={ styles.timer }>
            { timerText }
        </div>
    </div>
}