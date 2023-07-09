import type { Ref } from 'vue'

export type AlerType = 'alert-info' | 'alert-success' | 'alert-warning' | 'alert-error'

export interface Alert {
  message: string
  type?: AlerType
  duration? : number
}

const addAlert = (alerts: Ref<Array<Alert | null>>) =>  async (alert: Alert) => {
  alerts.value.push(alert)
}

const removeAlert  = (alerts: Ref<Array<Alert | null>>) =>  async (index: number) => {
  alerts.value[index] = null;
  if (alerts.value.every(element => element === null)) {
    alerts.value = [];
  }
}

export const useAlert = () => {
  const alerts = useState('alerts', () => [])
  return {
    alerts: readonly(alerts),
    addAlert: addAlert(alerts),
    removeAlert: removeAlert(alerts),
  }
}