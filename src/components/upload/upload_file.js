import React from 'react';
import logo from '../../images/logo.png';
import '../chart/chart.css'; 
//import Papa from 'papaparse';
import axios from 'axios';  
import {PYTHON_API} from '../../constant/links'


export default class upload_file extends React.Component {
  constructor(props){
    super(props)
    this.state = {
        csvfile: undefined,
        extError:false,
          }
    }
  UNSAFE_componentWillMount(){
   
  } 
  importCSV = () => {
    const { csvfile } = this.state;
    if (csvfile && csvfile.name.length > 0) {
              let fileName =csvfile.name;
              let parts = fileName.split('.');    
              let ext = parts[parts.length - 1];
              if( 'csv' !== ext.toLowerCase()){
                this.setState({extError: true}); 
              }else{   
              // Papa.parse(csvfile, {
              //   complete: this.updateData,
              //   header: false
              // });
              localStorage.setItem('fileName', this.state.csvfile.name);
              console.log(this.state.csvfile.name);
              let formData = new FormData();
              formData.append('source', this.state.csvfile);
              axios.post(`${PYTHON_API}getUploadfile`,formData,{ crossdomain: true }).then(res =>{              
                console.log(res)
                  if(res.statusText) {                   
                      this.props.history.push({pathname:'/visual-charts'})
                  }
              }).catch((error) => {
                console.log(error)
            });
            }
    }else{
      this.setState({extError: true});
    }
  };

  handleChange = event => {
    console.log('hi'+event);
    this.setState({
      csvfile: event.target.files[0],
      extError: false
    });
  };

  render() {
    return (
      <div className="home">
        <header className="header">
          <img src={logo} className="jmlogo" alt="logo" />  
          <div className="welcomtxt">Beautiful, automatic charts</div>      
        </header>
        <div>
            <div style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                  <input
                    className="csv-input"
                    type="file"
                    ref={input => {
                      this.filesInput = input;
                    }}
                    name="file"
                    placeholder={null}
                    onChange={this.handleChange}
                  />
            </div>
            <div style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <p style={{color: "#fa451c"}}>{this.state.extError === true ? 'Please choose CSV file to import items!':''}</p>
            </div> 
            <div  style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>     
                    <button className="btn-upload"  onClick={this.importCSV}><i className="fa fa-upload"></i> Upload </button>
            </div>
        </div>
      </div>
    );
  }
}