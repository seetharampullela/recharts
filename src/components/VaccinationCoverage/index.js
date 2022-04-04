// Write your code here
import {XAxis, YAxis, Legend, Bar, BarChart} from 'recharts'
import './index.css'

const VaccinationCoverage = props => {
  const {lastWeekReport} = props

  const dataFormatter = num => {
    if (num > 1000) {
      return `${(num / 1000).toString()}k`
    }
    return num.toString()
  }

  return (
    <div className="coverage-container">
      <h1 className="age-heading">Vaccination Coverage</h1>

      <BarChart
        data={lastWeekReport}
        margin={{top: 5}}
        width={900}
        height={500}
      >
        <XAxis dataKey="vaccineDate" tick={{stroke: 'grey', strokewidth: 1}} />
        <YAxis
          tickFormatter={dataFormatter}
          tick={{stroke: 'grey', strokewidth: 0}}
        />
        <Legend wrapperStyle={{padding: 30}} />
        <Bar dataKey="dose1" name="Dose 1" fill="#5a8dee" barSize="20%" />
        <Bar dataKey="dose2" name="Dose 2" fill=" #f54394" barSize="20%" />
      </BarChart>
    </div>
  )
}
export default VaccinationCoverage
