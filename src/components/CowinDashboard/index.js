// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import VaccinationCoverage from '../VaccinationCoverage/index'
import VaccinationByAge from '../VaccinationByAge'
import VaccinationByGender from '../VaccinationByGender'

import './index.css'

const apiConstant = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN PROGRESS',
  initial: 'INITIAL',
}

class CowinDashboard extends Component {
  state = {
    lastWeekReport: [],
    apiStatus: apiConstant.initial,
    vaccinationByAgeData: [],
    vaccinationByGenderData: [],
  }

  componentDidMount() {
    this.getCowinData()
  }

  getCowinData = async () => {
    this.setState({apiStatus: apiConstant.inProgress})

    const covidVaccinationDataApiUrl =
      'https://apis.ccbp.in/covid-vaccination-data'

    const response = await fetch(covidVaccinationDataApiUrl)

    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const updatedLastWeekData = data.last_7_days_vaccination.map(each => ({
        dose1: each.dose_1,
        dose2: each.dose_2,
        vaccineDate: each.vaccine_date,
      }))

      const updatedVaccinationByAge = data.vaccination_by_age.map(each => ({
        age: each.age,
        count: each.count,
      }))

      const updatedVaccinationByGender = data.vaccination_by_gender.map(
        each => ({
          count: each.count,
          gender: each.gender,
        }),
      )

      this.setState({
        lastWeekReport: updatedLastWeekData,
        vaccinationByAgeData: updatedVaccinationByAge,
        vaccinationByGenderData: updatedVaccinationByGender,
        apiStatus: apiConstant.success,
      })
    } else {
      this.setState({
        apiStatus: apiConstant.failure,
      })
    }
  }

  renderLoader = () => (
    <div testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderLastWeekData = () => {
    const {
      lastWeekReport,
      vaccinationByAgeData,
      vaccinationByGenderData,
    } = this.state

    return (
      <div>
        <div>
          <VaccinationCoverage lastWeekReport={lastWeekReport} />
        </div>
        <div>
          <VaccinationByGender
            vaccinationByGenderData={vaccinationByGenderData}
          />
        </div>

        <div>
          <VaccinationByAge vaccinationByAgeData={vaccinationByAgeData} />
        </div>
      </div>
    )
  }

  renderFailure = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1 className="failure-header">Something went wrong</h1>
    </div>
  )

  renderResultView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstant.success:
        return this.renderLastWeekData()
      case apiConstant.failure:
        return this.renderFailure()
      case apiConstant.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg-of-page">
        <div className="header">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
            className="logo-image"
          />
          <h1 className="page-heading">Co-WIN</h1>
        </div>
        <h1 className="page-heading">CoWIN Vaccination in India</h1>
        {this.renderResultView()}
      </div>
    )
  }
}
export default CowinDashboard
