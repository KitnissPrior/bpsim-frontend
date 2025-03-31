import "./navigationTab.css"
import '../../../styles/visually-hidden.css'

interface IProps {
  variant: any,
  activeTab: any,
  label: string,
  handleTabChange: (evt: any) => void,
}

const NavigationTab = ({ variant, label, handleTabChange, activeTab }: IProps) => {

  return (
    <label
      key={variant}
      className={
        'node-res-tab ' +
        `${activeTab === variant ? 'node-res-tab-active' : ''}`
      }
    >
      <input
        id="tournament-navigation-tab"
        value={variant}
        type="radio"
        checked={variant === activeTab}
        className="visually-hidden"
        onChange={handleTabChange}
      />
      <span className='node-res-tab-label'>{label}</span>
    </label>
  )
}

export default NavigationTab
