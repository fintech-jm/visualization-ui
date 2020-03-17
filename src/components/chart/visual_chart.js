import React from 'react';
import logo from '../../images/logo.png';
import './chart.css';
import { Line,Scatter,Bar,HorizontalBar } from 'react-chartjs-2';
import { Multiselect } from 'multiselect-react-dropdown';
import axios from 'axios';  
import {PYTHON_API} from '../../constant/links'
//import Papa from 'papaparse';
import {Matrix} from '../chart/correlation-function'
import Chart from "react-google-charts";
import HeatMap from "react-heatmap-grid"
import { HeatMapComponent, Legend, Tooltip, ILoadedEventArgs, HeatMapTheme, Inject } from '@syncfusion/ej2-react-heatmap';
import { Adaptor, ITooltipEventArgs } from '@syncfusion/ej2-react-heatmap';



export default class visual_chart extends React.Component {
  constructor(props){
    super(props)
    this.multiselectRef = React.createRef();
    this.state = {
            histogramGraphList:[],
            histoGramData:[],
            heatData : [],
            xLabelsHeat:[],
            yLabelsHeat:[],
            showChart:'',
            freqDistribution:[],
            colTypeData:[],
            variableTypes:[],
            biVariableTypes:{},
            multiVarTypes:{},
            catGetData:[],
            selectVarType:'loan_amnt',
            selectBiVarType:[],
            selectHorizonVal:'',
            selectBarVal:'',
            textBinRange:'',
            textLowRange:'',
            textHiRange:'',
            numaricGetData:[],
            selectedBiVarList: [],
            mulitiVarList: [],
            selectedMultiVarList:[],
            groupByName:'',
            biVari: "num",
            multiVar: "num",
            CSV_file_url:localStorage.getItem('fileName'),
            chartTypes:[
                        {id:1,name:'Scatter Plot'},
                        {id:2,name:'Column Chart'},
                        {id:3,name:'Bar Chart'},
                        {id:4,name:'Combo Chart'},
                        {id:5,name:'Line Chart'}, 
                        {id:6,name:'Histogram Chart'}, 
                        {id:7,name:'Frequency Distribution'},                      
                       ],
            columnsTypes:['Numarical Columns','Categorical Columns','Both'],
            analysisTypes:['Univariate Analysis','Bivariate Analysis','Multivariate Analysis','Correlation Analysis'],
            horizonValueType:['Counts','Counts Percentage'],
            bivarValueType:['sum','mean','both'],
            valueTypes:['Frequency Counts','Frequency Counts Percentage'],
            binRange:[],
            selectedColumnType:"Numarical Columns",
            selectanalysisType:'',
            bothLineData:{
              labels: [ "MON", "TUE", "WED", "THU", "FRI", "SAT" ,"SUN"],
              datasets: [
                {
                  label: "Line Chart",
                  data: [],
                  backgroundColor : '#4597ce',
                  borderColor : '#3e65a9',
                  borderWidth : 1
                }
              ]
            },
            bothLineOption:{
              legend: {
                position:"bottom" 
               },
              scales: {
                xAxes: [{
                  display: true,
                  gridLines: { color: "red", drawOnChartArea: false}
                }],
                yAxes: [{
                  display: true,                  
                  gridLines: { color: "red", drawOnChartArea: false}
                }]
              }
            },
            bivarBarData:{
              labels: ['0', '1', '2',
              '3', '4'],
              datasets: [                
                {
              label:'grade Counts',
              backgroundColor:'#3e65a9',
              stack:'1',
              data: [65, 59, 80, 81, 56],
              
                }],
                datasets: [                
                  {
                label:'Sub_grade Counts',
                stack:'1',
                backgroundColor:'#3e65a9',
                data: [70, 45, 89, 78, 60]
                  }]
            },
            bivarBarOption:{
              legend: {
                position:"bottom"
               },
              scales: {
                xAxes: [{
                  display: true,
                  gridLines: { color: "red", drawOnChartArea: false}
                }],
                yAxes: [{
                  display: true,                  
                  gridLines: { color: "red", drawOnChartArea: false}
                }]
              }
            }, 
            barData:{
              labels: ['0', '1', '2',
              '3', '4'],
              datasets: [                
                {
              label:'Frequency Counts',
              backgroundColor:'#3e65a9',
              data: [65, 59, 80, 81, 56]
                }]
            },
            barOption:{
              legend: {
                position:"bottom"
               },
              scales: {
                xAxes: [{
                  display: true,
                  gridLines: { color: "red", drawOnChartArea: false}
                }],
                yAxes: [{
                  display: true,                  
                  gridLines: { color: "red", drawOnChartArea: false}
                }]
              }
            },  
            scatterData:{
              labels: ['0', '1', '2',
              '3', '4','5','6'],
              datasets: [
                {
                  label: 'Loan Amount',
                  backgroundColor:'#3e65a9',
                  pointRadius: 2,
                  pointBorderWidth: 1,
                  data: [ 
                    { x: 0, y: 2500 },
                    { x: 1, y: 30000 },
                    { x: 2, y: 5000 },
                    { x: 3, y: 4000 },
                    { x: 4, y: 30000 },
                    { x: 5, y: 5550 },
                    { x: 6, y: 2000 },
                  ]
                }
              ]
            },
            scatterOption :{
              // maintainAspectRatio: false,
              // showLine: true,
              legend: {
               position:"bottom"
              },
              scales: {
                xAxes: [{
                  display: true,
                  gridLines: { color: "red", drawOnChartArea: false},
                  labelString: "Frequency (Hz)"
                }],
                yAxes: [{
                  display: true,                  
                  gridLines: { color: "red", drawOnChartArea: false},
                  labelString: "Frequency (Hz)"
                }]
              }
            },
            scatterBiVarData:{
              labels: [],
              datasets: [
                {
                  label: 'Loan Amount',
                  backgroundColor:'#3e65a9',
                  pointRadius: 2,
                  pointBorderWidth: 1,
                  yAxisID: 'y-axis-1',
                  data: [ 
                    { x: 0, y: 2500 },
                    { x: 1, y: 30000 },
                    { x: 2, y: 5000 },
                    { x: 3, y: 4000 },
                    { x: 4, y: 30000 },
                    { x: 5, y: 5550 },
                    { x: 6, y: 2000 },
                  ]
                },
                {
                  label: 'Funded Amount',
                  backgroundColor:'red',
                  pointRadius: 2,
                  pointBorderWidth: 1,
                  yAxisID: 'y-axis-2',
                  data: [ 
                    { x: 0, y: 2800 },
                    { x: 1, y: 31000 },
                    { x: 2, y: 5100 },
                    { x: 3, y: 4100 },
                    { x: 4, y: 31000 },
                    { x: 5, y: 5000 },
                    { x: 6, y: 3000 },
                  ]
                }
              ]
            },
            scatterBivarOption :{
              // maintainAspectRatio: false,
              // showLine: true,
              legend: {
               position:"bottom"
              },
              scales: {
                xAxes: [{
                  display: true,
                  gridLines: { color: "red", drawOnChartArea: false},
                  labelString: "Frequency (Hz)"
                }],
                yAxes: [{
                  display: true,                  
                  gridLines: { color: "red", drawOnChartArea: false},
                  scaleLabel: {
                  labelString: "Frequency (Hz)",
                  },
                  position: 'right',
                  id: 'y-axis-1',
                },
                {
                  display: true,                  
                  gridLines: { color: "red", drawOnChartArea: false},
                 scaleLabel: {
                  labelString: "Frequency (Hz)",
                  },
                  id: 'y-axis-2',
                }]
              }
            },
            mixedData :{
              datasets: [
                {
                  label: 'Counts',
                  type: 'line',
                  data: [51, 65, 40, 49, 60, 37, 40],
                  fill: false,
                  borderColor: '#4597ce',
                  backgroundColor: '#4597ce',
                  pointBorderColor: '#4597ce',
                  pointBackgroundColor: '#4597ce',
                  pointHoverBackgroundColor: '#4597ce',
                  pointHoverBorderColor: '#4597ce',
                  yAxisID: 'y-axis-2'
                },
                {
                  label: 'Counts Percentage',
                  type: 'bar',
                  data: [200, 185, 590, 621, 250, 400, 95],
                  fill: false,
                  backgroundColor: '#4165A7',
                  borderColor: '#4165A7',
                  hoverBackgroundColor: '#4165A7',
                  hoverBorderColor: '#4165A7',
                  yAxisID: 'y-axis-1'
                }
              ]
            },
            mixedOption: {
                responsive: true,
                legend: {
                  position:"bottom"
                 },
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                tooltips: {
                  mode: 'label'
                },
                elements: {
                  line: {
                    fill: false
                  }
                },
                scales: {
                  xAxes: [
                    {
                      display: true,
                      gridLines: {color: "red", drawOnChartArea: false},
                      labels: ['A', 'B', 'C', 'D', 'E', 'F', 'G']
                    }
                  ],
                  yAxes: [
                    {
                      type: 'linear',
                      display: true,
                      position: 'left',
                      id: 'y-axis-1',
                      gridLines: {color: "red", drawOnChartArea: false},
                      labels: {
                        show: true
                      }
                    },
                    {
                      type: 'linear',
                      display: true,
                      position: 'right',
                      id: 'y-axis-2',
                      gridLines: {
                        color: "red", drawOnChartArea: false
                      },
                      labels: {
                        show: true
                      }
                    }
                  ]
                }
              },
              mixedPlugins:{
                // afterDraw: (chartInstance, easing) => {
                //   const { ctx } = chartInstance.chart;
                //   ctx.fillText('This text drawn by a plugin', 100, 100);
                // }
              },
              horizontalData:{
                labels: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
                datasets: [
                  {
                    label: 'Counts',
                    backgroundColor: '#3e65a9',
                    borderColor: '#3e65a9',
                    borderWidth: 1,
                    hoverBackgroundColor: '#4597ce',
                    hoverBorderColor: '#4597ce',
                    data: [650, 590, 800, 810, 560, 550, 400]
                  }
                ]
              },
              horizontalOption:{
                legend: {
                  position:"bottom"
                 },
                scales: {
                  xAxes: [{
                    gridLines: {color: "red", drawOnChartArea: false}
                  }],
                  yAxes: [{
                    gridLines: {color: "red", drawOnChartArea: false}  
                  }]
              }
              },

              lineData : {
                labels: ['January', 'February', 'March',
                         'April', 'May'],
                         datasets: [
                            {
                              label: 'Counts',
                              type: 'line',
                              data: [51, 65, 40, 49, 60, 37, 40],
                              fill: false,
                              borderColor: '#4597ce',
                              backgroundColor: '#4597ce',
                              pointBorderColor: '#4597ce',
                              pointBackgroundColor: '#4597ce',
                              pointHoverBackgroundColor: '#4597ce',
                              pointHoverBorderColor: '#4597ce',
                              yAxisID: 'y-axis-2'
                            },
                            {
                              label: 'Counts Percentage',
                              type: 'line',
                              data: [200, 185, 590, 621, 250, 400, 95],
                              fill: false,
                              backgroundColor: '#4165A7',
                              borderColor: '#4165A7',
                              hoverBackgroundColor: '#4165A7',
                              hoverBorderColor: '#4165A7',
                              yAxisID: 'y-axis-1'
                            }
                          ]
              },
              lineOption : {
                responsive:true,
                maintainAspectRatio:true,
                title:{
                    display:true,
                  //  text:'Average Rainfall per month',
                    fontSize:20
                  },
                  scales: {
                    xAxes: [
                       {
                      //afterFit: function(scale) {
                    //     scale.width = 80 //<-- set value as you wish 
                    //  },
                        display: true,
                        gridLines: {color: "red", drawOnChartArea: false},
                        labels: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
                      //   ticks: {
                      //     suggestedMin: 50,
                      //     suggestedMax: 100
                      // }
                      }
                    ],
                    yAxes: [
                      {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        id: 'y-axis-1',
                        gridLines: {color: "red", drawOnChartArea: false},
                        labels: {
                          show: true
                        }
                      },
                      {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        id: 'y-axis-2',
                        gridLines: {color: "red", drawOnChartArea: false},
                        labels: {
                          show: true
                        }
                      }
                    ]
                  } 
              }
             
          }
          
    }
  UNSAFE_componentWillMount(){
    this.getCatData()
    this.getColData()
    this.getNumericData()
  }

  getNumericData =()=>{
    let univarNum=this.state.selectVarType;
    let binRange=this.state.textBinRange === ''?10000:this.state.textBinRange;    
      axios.defaults.headers.get['Content-Type'] ='application/json';
      axios.get(`${PYTHON_API}getUnivar?method=numeric univariate&dataset=${this.state.CSV_file_url}&univar_num=${univarNum}&bin_range=${binRange}`, { headers: { 'Content-Type': undefined } })
      .then(result =>{ 
        this.setState({
          numaricGetData: result.data
      })
      this.state.scatterData.datasets[0].data =[]
      let scatterDataRes = Object.values(this.state.numaricGetData[this.state.selectVarType][this.state.selectVarType])

      scatterDataRes.map((scatterDataVal,index)=>{
        this.state.scatterData.labels[index]=index
        this.state.scatterData.datasets[0].data[index] = {x:index , y:scatterDataVal}
      })
     this.state.barData={
      labels: Object.values(this.state.numaricGetData[this.state.selectVarType+'_bin']['bin']),
      datasets: [                
        {
      label:this.state.selectBarVal,
      backgroundColor:'#3e65a9',
      data: Object.values(this.state.numaricGetData[this.state.selectVarType+'_bin'][this.state.selectBarVal==='Frequency Counts'?'counts':'bin_percentage'])
        }]
    }
      this.state.binRange=Object.values(this.state.numaricGetData[this.state.selectVarType+'_bin']['bin'])
      this.setState({scatterData:this.state.scatterData,binRange:this.state.binRange,barData:this.state.barData})
      }) .catch((error) => {
        console.log(error)
    })
  
}

getBivarNum =(select)=>{
   // let CSV_file_url = 'loan_data.csv';
    axios.get(`${PYTHON_API}getBivar?num1=${select[0]}&num2=${select[1]}&dataset=${this.state.CSV_file_url}&method=numeric bivariate`, { headers: { 'Content-Type': undefined } })
    .then(result =>{ 
      this.setState({numGetBivarData: result.data})
      this.state.lineOption.scales.xAxes[0].labels =[]
      
      //  this.state.lineOption.scales.xAxes[0].labels=Object.keys(this.state.numGetBivarData[select[0]])
      //  this.state.lineData.datasets[0].data=Object.values(this.state.numGetBivarData[select[0]])
      //  this.state.lineData.datasets[0].label=select[0]
      //  this.state.lineData.datasets[1].data=Object.values(this.state.numGetBivarData[select[1]])
      //  this.state.lineData.datasets[1].label=select[1]

      let dataValue=[] 
      dataValue.push(['Line',select[0],select[1]])
  for(let i=0; i<Object.values(this.state.numGetBivarData[select[0]]).length ;i++ ){
    dataValue.push([Object.keys(this.state.numGetBivarData[select[0]])[i],Object.values(this.state.numGetBivarData[select[0]])[i],Object.values(this.state.numGetBivarData[select[1]])[i]])
  }
  this.state.lineData=dataValue
      this.state.scatterBiVarData.datasets[0].data =[]
      let scatterDataRes = Object.values(this.state.numGetBivarData[select[0]])     

      scatterDataRes.map((scatterDataVal,index)=>{
        this.state.scatterData.labels[index]=index
        this.state.scatterBiVarData.datasets[0].data[index] = {x:index , y:scatterDataVal}
      })
      this.state.scatterBiVarData.datasets[0].label=select[0]
      this.state.scatterBiVarData.datasets[1].data =[]
      let scatterDataRes1 = Object.values(this.state.numGetBivarData[select[1]])

      scatterDataRes1.map((scatterDataVal,index)=>{
       // this.state.scatterData.labels[index]=index
        this.state.scatterBiVarData.datasets[1].data[index] = {x:index , y:scatterDataVal}
      })
      this.state.scatterBiVarData.datasets[1].label=select[1]

      this.state.scatterBivarOption.scales.yAxes[0].scaleLabel.display = true
      this.state.scatterBivarOption.scales.yAxes[0].scaleLabel.labelString=select[0]
      this.state.scatterBivarOption.scales.yAxes[1].scaleLabel.display = true
      this.state.scatterBivarOption.scales.yAxes[1].scaleLabel.labelString=select[1]

       this.setState({scatterBiVarData:this.state.scatterBiVarData,scatterBivarOption:this.state.scatterBivarOption,lineData: this.state.lineData,lineOption:this.state.lineOption})
    }) .catch((error) => {
        console.log(error)
    }) 
}
mixedBiVarChart =(select)=>{
  this.state.mixedData=Object.assign({}, {
    datasets: [
      {
        label: this.state.biVari === "both"? select[0].id : select[0],
        type: 'line',
        data: Object.values(this.state.catGetBivarData[this.state.biVari === "both"? select[0].id : select[0]]),
        fill: false,
        borderColor: '#4597ce',
        backgroundColor: '#4597ce',
        pointBorderColor: '#4597ce',
        pointBackgroundColor: '#4597ce',
        pointHoverBackgroundColor: '#4597ce',
        pointHoverBorderColor: '#4597ce',
        yAxisID: 'y-axis-1'
      },
      {
        label: this.state.biVari === "both"? select[1].id : select[1],
        type: 'line',
        data: Object.values(this.state.catGetBivarData[this.state.biVari === "both"? select[1].id :select[1]]),
        fill: false,
        borderColor: '#36baba',
        backgroundColor: '#36baba',
        pointBorderColor: '#36baba',
        pointBackgroundColor: '#36baba',
        pointHoverBackgroundColor: '#36baba',
        pointHoverBorderColor: '#36baba',
        yAxisID: 'y-axis-2'
      },
      {
        label: this.state.biVari === "both"? select[0].id : select[0]+'_Percentage',
        type: 'bar',
        data: Object.values(this.state.catGetBivarData[this.state.biVari === "both"? select[0].id :select[0]+'_Percentage']),
        fill: false,
        backgroundColor: '#5536ba',
        borderColor: '#5536ba',
        hoverBackgroundColor: '#5536ba',
        hoverBorderColor: '#5536ba',
        yAxisID: 'y-axis-3'
      },
      {
        label: this.state.biVari === "both"? select[1].id :select[1]+'_Percentage',
        type: 'bar',
        data: Object.values(this.state.catGetBivarData[this.state.biVari === "both"? select[1].id :select[1]+'_Percentage']),
        fill: false,
        backgroundColor: '#4165A7',
        borderColor: '#4165A7',
        hoverBackgroundColor: '#4165A7',
        hoverBorderColor: '#4165A7',
        yAxisID: 'y-axis-4'
      }
    ]
  })
  this.state.mixedOption=Object.assign({}, {
    responsive: true,
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    tooltips: {
      mode: 'label'
    },
    elements: {
      line: {
        fill: false
      }
    },
    scales: {
      xAxes: [
        {
          display: true,
          gridLines: {
            display: false
          },

          labels: Object.keys(this.state.catGetBivarData[this.state.biVari === "both"? select[0].id : select[0]])
        },
        {
          display: true,
          gridLines: {
            display: false
          },

          labels: Object.keys(this.state.catGetBivarData[this.state.biVari === "both"? select[1].id :select[1]])
        }
      ],
      yAxes: [
        {
          type: 'linear',
          display: true,
          scaleLabel: {
            display: true,
            labelString:  select[0] 
          },
          position: 'left',
          id: 'y-axis-1',
          gridLines: {color:'red', drawOnChartArea: false},
          labels: {
            show: true
          }
        },
        {
          type: 'linear',
          display: true,
          scaleLabel: {
            display: true,
            labelString:  select[1] 
          },
          position: 'left',
          id: 'y-axis-2',
          gridLines: {color:'red', drawOnChartArea: false},
          labels: {
            show: true
          }
        },
        {
          type: 'linear',
          display: true,
          scaleLabel: {
            display: true,
            labelString: select[0]+'_Percentage'
          },
          position: 'right',
          id: 'y-axis-3',
          gridLines: {color:'red', drawOnChartArea: false},
          labels: {
            show: true
          }
        },
        {
          type: 'linear',
          display: true,
          scaleLabel: {
            display: true,
            labelString: select[1]+'_Percentage'
          },
          position: 'right',
          id: 'y-axis-4',
          gridLines: {color:'red', drawOnChartArea: false},
          labels: {
            show: true
          }
        }
      ]
    }
  })

  this.setState({
    mixedData: this.state.mixedData,mixedOption: this.state.mixedOption
})
}

getBivarCat =(select)=>{
  //let CSV_file_url = 'loan_data.csv';
    axios.get(`${PYTHON_API}getBivar?cat1=${select[0]}&cat2=${select[1]}&dataset=${this.setState.CSV_file_url}&method=categorical bivariate`, { headers: { 'Content-Type': undefined } })
    .then(result =>{ 
      this.setState({catGetBivarData: result.data})
    this.mixedBiVarChart(select);
    }) .catch((error) => {
        console.log(error)
    })
}

getBivarBoth =(select,typeValue)=>{
  //let CSV_file_url = 'loan_data.csv';
  //${PYTHON_API}getBivar?cat=grade&num=annual_inc&dataset=loan_data.csv&method=bivariate sum mean
  axios.get(`${PYTHON_API}getBivar?${select[0].name}=${select[0].id}&${select[1].name}=${select[1].id}&dataset=${this.state.CSV_file_url}&method=bivariate%20${typeValue === "both"?"sum mean":typeValue}`, { headers: { 'Content-Type': undefined } })
    .then(result =>{ 
       this.setState({catGetBivarData: result.data})
     if(typeValue !=='both' ){    
       console.log()
    
     }
     if( typeValue === "both"){
            this.state.mixedOption.scales.xAxes[0].labels=[]
            this.state.mixedData.datasets[0].data=[]
            this.state.mixedData.datasets[1].data= []
            this.state.mixedOption.scales.xAxes[0].labels=Object.values(this.state.catGetBivarData['Sum'][select[0].id])
            this.state.mixedData.datasets[0].data=Object.values(this.state.catGetBivarData['Sum'][select[1].id])
            this.state.mixedData.datasets[0].label="Sum"
            this.state.mixedData.datasets[1].data=Object.values(this.state.catGetBivarData['Mean'][select[1].id])
            this.state.mixedData.datasets[1].label="Mean"
            this.setState({
              mixedData: this.state.mixedData,mixedOption: this.state.mixedOption,
          })
     } else {
            this.state.bothLineData.labels=[]
            this.state.bothLineData.datasets[0].data=[]
            this.state.bothLineData.labels=Object.values(this.state.catGetBivarData[select[select[0].name === "cat" ? 0 : 1].id])
            this.state.bothLineData.datasets[0].data=Object.values(this.state.catGetBivarData[select[select[0].name === "cat" ? 1 : 0].id])
            this.state.bothLineData.datasets[0].label=typeValue
            this.state.barData.labels=[]
            this.state.barData.datasets[0].data=[]
            this.state.barData.labels=Object.values(this.state.catGetBivarData[select[select[0].name === "cat" ? 0 : 1].id])
            this.state.barData.datasets[0].data=Object.values(this.state.catGetBivarData[select[select[0].name === "cat" ? 1 : 0].id])
            this.state.barData.datasets[0].label=typeValue
            this.setState({
              bothLineData:this.state.bothLineData,
              barData:this.state.barData,
          })
     }   
    }) .catch((error) => {
        console.log(error)
    })
   
    // axios.get(`${PYTHON_API}getBivar?cat=grade&num=annual_inc&dataset=${CSV_file_url}&method=bivariate mean`, { headers: { 'Content-Type': undefined } })
    // .then(result =>{ 
    //   console.log(result.data)      
    //   this.setState({catGetBivarData: result.data})
    // }) .catch((error) => {
    //     console.log(error)
    // })
}
  
  getCatData =()=>{
  
          axios.defaults.headers.get['Content-Type'] ='application/json';
        //  let CSV_file_url = 'loan_data.csv';
          axios.get(`${PYTHON_API}getUnivar?method=categorical univariate&dataset=${this.state.CSV_file_url}&univar_cat=${this.state.selectVarType}`, { headers: { 'Content-Type': undefined } })
          .then(result =>{
            this.setState({
              catGetData: result.data
          })  
            this.state.mixedData=Object.assign({}, {
              datasets: [
                {
                  label: 'Counts',
                  type: 'line',
                  data: Object.values(this.state.catGetData[this.state.selectVarType]),
                  fill: false,
                  borderColor: '#4597ce',
                  backgroundColor: '#4597ce',
                  pointBorderColor: '#4597ce',
                  pointBackgroundColor: '#4597ce',
                  pointHoverBackgroundColor: '#4597ce',
                  pointHoverBorderColor: '#4597ce',
                  yAxisID: 'y-axis-2'
                },
                {
                  label: 'Counts Percentage',
                  type: 'bar',
                  data: Object.values(this.state.catGetData[this.state.selectVarType+'_Percentage']),
                  fill: false,
                  backgroundColor: '#4165A7',
                  borderColor: '#4165A7',
                  hoverBackgroundColor: '#4165A7',
                  hoverBorderColor: '#4165A7',
                  yAxisID: 'y-axis-1'
                }
              ]
            })
            this.state.mixedOption=Object.assign({}, {
              responsive: true,
              labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
              tooltips: {
                mode: 'label'
              },
              elements: {
                line: {
                  fill: false
                }
              },
              scales: {
                xAxes: [
                  {
                    display: true,
                    gridLines: {
                      display: false
                    },

                    labels: Object.keys(this.state.catGetData[this.state.selectVarType])
                  }
                ],
                yAxes: [
                  {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    id: 'y-axis-1',
                    gridLines: {color:'red', drawOnChartArea: false},
                    labels: {
                      show: true
                    }
                  },
                  {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    id: 'y-axis-2',
                    gridLines: {color:'red', drawOnChartArea: false},
                    labels: {
                      show: true
                    }
                  }
                ]
              }
            })
            
            this.state.horizontalData=Object.assign({},{
              labels: Object.keys(this.state.catGetData[this.state.selectVarType]),
              datasets: [
                {
                  label: this.state.selectHorizonVal==='Counts'?'Counts':'Counts Percentage',
                  backgroundColor: '#3e65a9',
                  borderColor: '#3e65a9',
                  borderWidth: 1,
                  hoverBackgroundColor: '#4597ce',
                  hoverBorderColor: '#4597ce',
                  data: Object.values(this.state.catGetData[this.state.selectHorizonVal==='Counts'?this.state.selectVarType:this.state.selectVarType+'_Percentage'])
                }
              ]
            })
            this.setState({
              horizontalData: this.state.horizontalData,mixedData: this.state.mixedData,mixedOption: this.state.mixedOption
          })

          }) .catch((error) => {
            console.log(error)
        }) 
  }

  getColData =()=>{
      let formData = new FormData();
      formData.append("dataset", this.state.CSV_file_url);
        axios.post(`${PYTHON_API}getColType`,formData,{ crossdomain: true }).then(res =>{
          this.setState({colTypeData:res.data})       
        }).catch((error) => {
          console.log(error)
      }) 
      
    
  }

  chartTypeChange =(e)=>{
    console.log(e.target.value)
    this.setState({ showChart : e.target.value});

    if(e.target.value==='7'){

    }
  }
  horizonValTypeChange =(e)=>{
    this.setState({ selectHorizonVal : e.target.value});
    this.state.selectanalysisType === "Univariate Analysis" && this.getCatData();
   
    if( this.state.selectanalysisType === "Bivariate Analysis" ){
      this.state.biVari === "both" && this.getBivarBoth(this.state.selectedBiVarList,e.target.value) 
    }

    if( this.state.selectanalysisType === "Multivariate Analysis" ){
          this.state.biVari === "both" && this.getMultiBoth(this.state.mulitiVarList,e.target.value) 
        }
  }
 
  barValTypeChange =(e)=>{    
    this.setState({ selectBarVal : e.target.value});
    this.getNumericData();
  }

  lowRangeChange=(e)=>{
    const re = new RegExp("^-?[0-9.]*$");
    var lowRangeVal='';
    if (e.target.value === '' || re.test(e.target.value)) {
      lowRangeVal =  e.target.value
     } 
     this.setState({                                   
      textLowRange: lowRangeVal
    })  
  }

  hiRangeChange=(e)=>{
    const re = new RegExp("^-?[0-9.]*$");
    var hiRangeVal='';
    if (e.target.value === '' || re.test(e.target.value)) {
      hiRangeVal =  e.target.value
     } 
     this.setState({                                   
      textHiRange: hiRangeVal
    })  
  }
 
  binRangeChange =(e)=>{
    const re = /^[0-9.\b]+$/; 
    var binRangeVal='';
    if (e.target.value === '' || re.test(e.target.value)) {
      binRangeVal =  e.target.value
     } 
     this.setState({                                   
      textBinRange: binRangeVal
    }) 
  }

  binRangeChangeBlur =(e)=>{
    this.setState({ textBinRange : e.target.value});
    if(this.state.multiVar === "num" && this.state.selectanalysisType === "Multivariate Analysis"){
      this.getMultiNum(this.state.mulitiVarList)
   }else{
    this.getNumericData();
   }   
  }
  
  analysisTypeChange =(e)=>{
 //   ( this.state.selectedMultiVarList.length > 0 || this.state.selectedBiVarList.length > 0 ) &&  this.resetValues();
    let selectType=e.target.value
    this.state.columnsTypes=selectType==="Univariate Analysis"?['Numarical Columns','Categorical Columns']:['Numarical Columns','Categorical Columns','Both']
    this.setState({selectanalysisType : e.target.value, columnsTypes:this.state.columnsTypes})   
  }

  columnsTypeChange =(e)=>{
   let columnType = '';
   this.state.variableTypes=[];
  //  this.state.biVariableTypes=[];
  //  this.state.multiVarTypes=[];
  //  this.state.mulitiVarList=[];
  //  this.state.selectedBiVarList=[];
  //  this.setState({biVariableTypes:this.state.biVariableTypes,selectedBiVarList: this.state.selectedBiVarList})
 
    if(e.target.value === "Numarical Columns"){
      columnType = 'Numeric columns'      
      this.setState({biVari: "num",multiVar: "num"})
    }else if(e.target.value === "Categorical Columns"){
      columnType = 'Categorical columns'
      this.setState({biVari: "cat",multiVar: "cat"})
    } else {
      columnType = 'both'
      this.setState({biVari: "both",multiVar: "both"})
    }    
    ( this.state.selectedMultiVarList.length > 0 || this.state.selectedBiVarList.length > 0 ) &&  this.resetValues();
    
    if(columnType === "both" && (this.state.selectanalysisType === "Bivariate Analysis" || this.state.selectanalysisType === "Multivariate Analysis") ){
          if(this.state.selectanalysisType === "Bivariate Analysis" ){
              this.state.colTypeData["Categorical columns"].map((value)=>{
                    this.state.variableTypes.push({name: "cat", id: value})
                })
          } 
      this.state.colTypeData["Numeric columns"].map((value)=>{
        this.state.variableTypes.push({name: "num", id: value})
    })
    }
   let variableTypes = (columnType === "both" && (this.state.selectanalysisType === "Bivariate Analysis" || this.state.selectanalysisType === "Multivariate Analysis")) ? this.state.variableTypes : this.state.colTypeData[columnType]
  if(columnType === "both" &&  this.state.selectanalysisType === "Multivariate Analysis"){
    this.setState({ variableTypes : this.state.colTypeData["Categorical columns"],multiVarTypes: this.state.variableTypes })
   }
   else{
    this.setState({ variableTypes : variableTypes, biVariableTypes: variableTypes});
   }
  this.setState({selectedColumnType: e.target.value })
  //   this.setState({selectedColumnType: e.target.value , showChart: e.target.value === "Numarical Columns" && this.state.selectanalysisType === "univariate Analysis" ? "1" : this.state.selectanalysisType === "Bivariate Analysis"? "4" : (this.state.selectanalysisType === "Multivariate Analysis") ? "2": "3"})

  //  if(this.state.selectanalysisType === "Multivariate Analysis"){
  //    columnType === "num" ? this.setState({showChart: "6"}) : ''

  //  } else if(this.state.selectanalysisType === "Bivariate Analysis"){
  //     this.setState({showChart: "4"})
  // } else if(this.state.selectanalysisType === "univariate Analysis"){
  //    columnType === "num" ? this.setState({showChart: "1"}) : ''
  // }
   
    // if(this.state.selectanalysisType === "Bivariate Analysis" && e.target.value === "Numarical Columns"){
    //   this.getBivarNum();
    // }else if(this.state.selectanalysisType === "Bivariate Analysis" && e.target.value === "Categorical Columns"){
    //   this.getBivarCat();
    // }else if(this.state.selectanalysisType === "Bivariate Analysis" && e.target.value === "Both"){
    //   this.getBivarBoth();      
    // }else
    // this.getNumericData();
    // console.log(this.multiselectRef)
  }

  resetValues() {
    // By calling the belowe method will reset the selected values programatically
   
    let count = this.state.selectedMultiVarList.length || this.state.selectedBiVarList.length 
    for(let i=0; i< count ;i++){
      this.multiselectRef.onRemoveSelectedItem();
    }
  }

  colTypeChange =(e)=>{
    this.state.selectVarType=e.target.value;
    this.setState({selectVarType:this.state.selectVarType})
    this.getCatData();
    this.getNumericData();
  }
  onSelect=(selectedList,selectedItem)=> {

      this.setState({selectedBiVarList: selectedList,mulitiVarList: selectedList})

   if(selectedList.length == 2 && this.state.biVari !== "both" && this.state.selectanalysisType === "Bivariate Analysis"){
      this.state.biVari == "num" ? this.getBivarNum(selectedList) : this.getBivarCat(selectedList)
   }
   if(this.state.multiVar === "cat" && this.state.selectanalysisType === "Multivariate Analysis"){
      this.getfreqDistribution(selectedList)
   }
} 

onRemove=(selectedList,selectedItem)=> {
  this.setState({selectedBiVarList: selectedList,mulitiVarList: selectedList})
} 


/*   ------------------    MultiVaribale Analysis Function Start ------------------------            */

//    add select component based on selectt multiple variable type

getSelectRenderList=(selectMulitVarList)=>{
        let selectList=[]
        for(let i=0;i < selectMulitVarList.length;i++){
          
          selectList.push(  <div className="select-box"><label>Select Var {i+1}  : </label><select className="form-control p-0 option-bg" id={selectMulitVarList[i]} name={selectMulitVarList[i]} onChange={(e)=>{this.selectMultiVariable(e)}} >
          <option  key ={"default"} value={"please Select"}>Please Select</option>
          {             selectMulitVarList.map((value) =>{
                            return <option  key ={value} value={value}>{value}</option>
                        })
          }                                       
          </select>
          </div>)

        }

        return selectList
}

//    select group by function

selectMultiVariable=(e)=>{
  if(e.target.name === "groupBy" ){
        this.setState({groupByName: e.target.value})
        if(this.state.selectedColumnType == "Categorical Columns"){
        this.getMultiCat(e.target.value)
      }
       
    } else {
      this.state.selectedMultiVarList.push(e.target.value)
      this.setState({selectedMultiVarList: this.state.selectedMultiVarList})
    }
}


getfreqDistribution=(selectList)=>{
  let graphList = []
  let formData = new FormData();
            formData.append("dataset", this.state.CSV_file_url);
            formData.append("method", "cat all multivariate");
            formData.append("catcol", selectList);

              axios.post(`${PYTHON_API}getMultivar`,formData,{ crossdomain: true }).then(res =>{
                this.setState({freqDistributionData: res.data})
                for(let i=0;i<selectList.length;i++){
                  graphList.push(  
                  <Chart
                  key={selectList[i]}
                  width={'500px'}
                  height={'300px'}
                  chartType="Bar"
                  loader={<div>Loading Chart</div>}
                  data={
                    this.getHistogramData(res.data[selectList[i]],selectList[i])
                  }
                  options={{
                    title: ` ${selectList[i]}`,
                    legend: { position: 'none' },
                    colors: ['#3e65a9'],
                    vAxis: {
                      gridlines: {
                        color: 'transparent'
                      }
                    }
                  }}
                  rootProps={{ 'data-testid': '2' }}
                />

                  )
                }
                this.setState({freqDistribution: graphList})
              })

 }
getMultiNum=(selectList)=>{
  let graphList = []
            let formData = new FormData();
            formData.append("dataset", "loan_data.csv");
            formData.append("method", "num all multivariate");
            formData.append("numcol", selectList);
            formData.append("histogram_bin", this.state.textBinRange);
             axios.post(`${PYTHON_API}getMultivar`,formData,{ crossdomain: true }).then(res =>{
              this.setState({histoGramData: res.data,histogramGraphList:[]})
              // this.state.barData.labels=[]
              // this.state.barData.datasets[0].data=[]
                for(let i=0;i<selectList.length;i++){                  
                 graphList.push(
                  //   <Chart
                  //   key={selectList[i]}
                  //   width={'500px'}
                  //   height={'300px'}
                  //   chartType="Histogram"
                  //   loader={<div>Loading Chart</div>}
                  //   data={
                  //     this.getHistogramData(res.data[selectList[i]],selectList[i])
                  //   }
                  //   options={{
                  //     title: ` ${selectList[i]}`,
                  //     legend: { position: 'none' },
                  //     colors: ['#3e65a9'],
                  //     vAxis: {
                  //       gridlines: {
                  //           color: 'transparent'
                  //       },
                  //       baselineColor: 'red'
                  //   },
                  //    hAxis:{
                  //      baselineColor: 'red'
                  //    }
                  //   }}
                  //   rootProps={{ 'data-testid': '2' }}
                  // />
                  <div style={{width
                  :"600px"}}>

                 <Bar
                 data={{
                   labels: Object.keys(res.data[selectList[i]]),
                   datasets: [                
                     {
                       label:selectList[i],
                       backgroundColor:'#3e65a9',
                       data: Object.values(res.data[selectList[i]])
                      }]}
                    } 
                    options={this.state.barOption}/>
                    </div>              
                    )
                  }
                  this.setState({histogramGraphList: graphList,barData: this.state.barData})
              }).catch((error) => {
                console.log(error)
            }) 
            
             
}

getHistogramData=(data,dataName)=>{
  let dataValue=[]
  
  dataValue.push([dataName,"length"])
  for(let i=0; i<Object.values(data).length ;i++ ){
    dataValue.push([Object.keys(data)[i],Object.values(data)[i]])
  }
  return dataValue
}

getMultiCat=(selectGroupby)=>{
            let formData = new FormData();
            formData.append("dataset", "loan_data.csv");
            formData.append("method", "categorical multivariate");
            formData.append("columns", this.state.selectedMultiVarList);
            formData.append("groupby", selectGroupby);
              axios.post(`${PYTHON_API}getMultivar`,formData,{ crossdomain: true }).then(res =>{
                 let result = res.data
                 let xAxisData=[]
                 for(let i=0; i<Object.values(result[this.state.selectedMultiVarList[0]]).length ;i++ ){
                   let temp=''   
                   for(let j=0; j<this.state.selectedMultiVarList.length;j++){               
                    temp+=( Object.values(result[this.state.selectedMultiVarList[j]])[i]+'_')
                   }
                   xAxisData.push(temp)                   
                }
                 this.state.barData.labels=[]
                 this.state.barData.labels= xAxisData
                 this.state.barData.datasets[0].data=[]
                 this.state.barData.datasets[0].data=Object.values(result[selectGroupby])
                this.setState({barData: this.state.barData})  
              }).catch((error) => {
                console.log(error)
            }) 
}

getMultiBoth=(select, selectType)=>{
       //     console.log("multivar ===",select,selectType)
            let selectedColumn=[]
            for(let i=0;i<select.length ;i++){
              selectedColumn.push(select[i].id)
            }
            let formData = new FormData();
            formData.append("dataset", "loan_data.csv");
            formData.append("method", `numeric multivariate ${selectType}`);
            formData.append("columns", selectedColumn);
            formData.append("groupby", this.state.groupByName);
              axios.post(`${PYTHON_API}getMultivar`,formData,{ crossdomain: true }).then(res =>{
                if(selectType!=='both'){    
                  if(this.state.showChart === "5"){
                   
                    this.state.mixedOption.scales.xAxes[0].labels=[]
                    this.state.mixedData.datasets[0].data=[]
                    this.state.mixedData.datasets[0].type="line"
                    this.state.mixedData.datasets[1].type="line"
                    this.state.mixedData.datasets[1].data= []
                    this.state.mixedOption.scales.xAxes[0].labels=Object.keys(res.data[selectedColumn[0]])
                    // this.state.mixedOption.scales.xAxes[0].labels=Object.keys(res.data[selectedColumn[1]])
                    this.state.mixedData.datasets[0].data=Object.values(res.data[selectedColumn[1]])
                    this.state.mixedData.datasets[0].label=selectedColumn[1]
                    this.state.mixedData.datasets[1].data=Object.values(res.data[selectedColumn[0]])
                    this.state.mixedData.datasets[1].label=selectedColumn[0]
     //               console.log(this.state.mixedData);
                    this.setState({mixedData: this.state.mixedData})
                   }else{
                          this.state.mixedOption.scales.xAxes[0].labels=[]
                          this.state.mixedData.datasets[0].data=[]
                          this.state.mixedData.datasets[1].data= []
                          this.state.mixedData.datasets[0].type="bar"
                          this.state.mixedData.datasets[1].type="bar"                  
                          this.state.mixedOption.scales.xAxes[0].labels=Object.keys(res.data[selectedColumn[0]])
                          this.state.mixedOption.scales.xAxes[0].labels=Object.keys(res.data[selectedColumn[1]])
                          this.state.mixedData.datasets[0].data=Object.values(res.data[selectedColumn[1]])
                          this.state.mixedData.datasets[0].label=selectedColumn[1]
                          this.state.mixedData.datasets[1].data=Object.values(res.data[selectedColumn[0]])
                          this.state.mixedData.datasets[1].label=selectedColumn[0]
                          this.setState({mixedData: this.state.mixedData})
                   }
                  }
                 if(this.state.showChart === "4"){
                  this.state.mixedOption.scales.xAxes[0].labels=[]
                  this.state.mixedData.datasets[0].data=[]
                  this.state.mixedData.datasets[1].data= []
                  this.state.mixedData.datasets[0].type="line"
                  this.state.mixedData.datasets[1].type="bar"                  
                  this.state.mixedOption.scales.xAxes[0].labels=Object.keys(res.data[selectedColumn[0]])
                  this.state.mixedOption.scales.xAxes[0].labels=Object.keys(res.data[selectedColumn[1]])
                  this.state.mixedData.datasets[0].data=Object.values(res.data[selectedColumn[1]])
                  this.state.mixedData.datasets[0].label=selectedColumn[1]
                  this.state.mixedData.datasets[1].data=Object.values(res.data[selectedColumn[0]])
                  this.state.mixedData.datasets[1].label=selectedColumn[0]
                  this.setState({mixedData: this.state.mixedData})
                 }
              }).catch((error) => {
                console.log(error)
            }) 
}



/* ---------------  MultiVariables Analysis Function End --------------- */

/*   ------------------    Correlation Analysis Function Start ------------------------            */
correlationSubmit=()=>{ 
  console.log(this.state.textHiRange,this.state.textLowRange)

if((Number(this.state.textHiRange)>Number(this.state.textLowRange))||(this.state.textHiRange===''&&this.state.textLowRange==='')){ 
    this.setState({showChart:''})
    this.getCorrelationData();
}else{
  alert(" Selection Range must be Low to High")
} 
}

getCorrelationData=(select, selectType)=>{
  
  let formData = new FormData();
  //let numaricData=Object.values(this.state.colTypeData["Numeric columns"]);
  console.log(this.state.mulitiVarList)
  formData.append("dataset", this.state.CSV_file_url);
  formData.append("method", (this.state.textLowRange==='' && this.state.textHiRange==='')?`all`:`filter`);
  formData.append("columns", this.state.mulitiVarList); 
  if(this.state.textLowRange!==''&&this.state.textHiRange!==''){
  formData.append("range1", this.state.textLowRange); 
  formData.append("range2", this.state.textHiRange);
  } 
  //textLowRange 
 // console.log(formData)
    axios.post(`${PYTHON_API}getCorrelation`,formData,{ crossdomain: true }).then(res =>{
  //    console.log("success",res.data)  
      let title =Object.keys(res.data);
 // console.log("sfsd",title) 
      this.state.xLabelsHeat=[]
      this.state.heatData=[]
      this.state.xLabelsHeat=Object.keys(res.data[title[0]])
      this.state.yLabelsHeat=Object.keys(res.data[title[0]])
       for(let i=0;i<title.length ;i++){
         this.state.heatData.push(Object.values(res.data[title[i]]))
        }
      this.setState({xLabelsHeat:this.state.xLabelsHeat,yLabelsHeat:this.state.yLabelsHeat,heatData:this.state.heatData})
    }).catch((error) => {
      console.log(error)
  }) 
}


/* ---------------  Correlation Analysis Function End --------------- */

// load(args) {
//   let selectedTheme = location.hash.split('/')[1];
//   selectedTheme = selectedTheme ? selectedTheme : 'Material';
//   args.heatmap.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
// };
tooltipTemplate(args) {
  args.content = [args.yLabel + ' | ' + args.xLabel + ' : ' + args.value + ' value'];
};



  render() {
  //  console.log('render'+this.state.mixedData,this.state.mulitiVarList,this.state.histoGramData);
    return (
      <div className="home">
        <header className="header">
           <img src={logo} className="jmlogo" alt="logo" />   
          <div className="title">Visualization</div>      
        </header>       
        <div className="filter">
          <div className="select-box">
            <label>Type Of Analysis</label>
            <select className="form-control p-0 option-bg" id="" name="" onChange={(e)=>{this.analysisTypeChange(e)}}>
              <option  key ={"default"} value={"please Select"}>Please Select</option>
              {             this.state.analysisTypes.map((value) =>{
                                return <option  key ={value} value={value}>{value}</option>
                            })
              }                                     
            </select>
          </div>
          {this.state.selectanalysisType !== "Correlation Analysis" ? 
          <div className="select-box">
            <label>Column Type</label>
            <select className="form-control p-0 option-bg" id="" name="" onChange={(e)=>{this.columnsTypeChange(e)}} >
            <option  key ={"default"} value={"please Select"}>Please Select</option>
            {             this.state.columnsTypes.map((value) =>{
                              return <option  key ={value} value={value}>{value}</option>
                          })
            }                                       
            </select>
          </div>
          :''}
          <div className="select-box">
            <label>Variable</label>
            {this.state.selectanalysisType === "Bivariate Analysis" || this.state.selectanalysisType === "Multivariate Analysis" || this.state.selectanalysisType === "Correlation Analysis"?
            <Multiselect
            options={this.state.biVari === "both" || this.state.multiVar === "both"? this.state.selectanalysisType === "Bivariate Analysis" ? this.state.biVariableTypes: this.state.multiVarTypes : this.state.selectanalysisType === "Correlation Analysis"? this.state.colTypeData["Numeric columns"]:this.state.variableTypes}
            showCheckbox={true}
            selectionLimit={this.state.selectanalysisType === "Multivariate Analysis" && this.state.multiVar != "both" ? "-1" : this.state.selectanalysisType === "Correlation Analysis"?"20":"2"}
            isObject={this.state.biVari === "both"? true : this.state.multiVar === "both" ? true : false}
            displayValue="id" 
            groupBy={this.state.biVari === "both"? "name" : ""}
            onSelect={this.onSelect}
            onRemove={this.onRemove}
            ref={ref=>{this.multiselectRef = ref}}
          />:
          <select className="form-control p-0 option-bg" id="" name="" onChange={(e)=>{this.colTypeChange(e)}}>
            <option  key ={"default"} value={"please Select"}>Please Select</option>
            {             this.state.variableTypes.map((value) =>{
                            
                              return <option  key ={value} value={value}>{value}</option>
                          })
            }                              
            </select>
          }
          </div>
          {this.state.selectanalysisType !== "Correlation Analysis" ? 
          <div className="select-box">
            <label>Chart Type</label>            
            <select className="form-control p-0 option-bg" id="" name="" onChange={(e)=>{this.chartTypeChange(e)}}>            
                        <option  key ={"default"} value={"please Select"}>Please Select</option>
            {
                        
                                            this.state.chartTypes.map((value,index) =>{
                                            if(this.state.selectanalysisType === "Univariate Analysis" && this.state.selectedColumnType === "Numarical Columns")  {
                                              return (index === 0 || index === 1) && <option key ={value.id} value={value.id}>{value.name}</option>
                                            }else if(this.state.selectanalysisType === "Bivariate Analysis" && this.state.selectedColumnType === "Numarical Columns"){
                                              return (index === 0 || index === 4)&& <option key ={value.id} value={value.id}>{value.name}</option>
                                            }else if(this.state.selectanalysisType === "Bivariate Analysis" && this.state.selectedColumnType === "Categorical Columns"){
                                              return (index === 3)&& <option key ={value.id} value={value.id}>{value.name}</option>
                                            }else if(this.state.selectanalysisType === "Bivariate Analysis" && this.state.selectedColumnType === "Both"){
                                              return (index === 1 || index === 3 || index === 4)&& <option key ={value.id} value={value.id}>{value.name}</option>
                                            }
                                            else if(this.state.selectanalysisType === "Univariate Analysis" && this.state.selectedColumnType === "Categorical Columns"){
                                              return (index === 2 || index === 3) && <option key ={value.id} value={value.id}>{value.name}</option>
                                            }else if(this.state.selectanalysisType === "Multivariate Analysis" && this.state.selectedColumnType === "Categorical Columns")  {
                                              return (index === 1 || index === 6) && <option key ={value.id} value={value.id}>{value.name}</option>
                                            }else if(this.state.selectanalysisType === "Multivariate Analysis" && this.state.multiVar === "both")  {
                                              return index != 0 && index != 2 &&  index != 5 && index != 6 && <option key ={value.id} value={value.id}>{value.name}</option>
                                            }else if(this.state.selectanalysisType === "Multivariate Analysis" && this.state.multiVar === "num")  {
                                              return index == 5 && <option key ={value.id} value={value.id}>{value.name}</option>
                                            }else{
                                              return index <= 1 && <option key ={value.id} value={value.id}>{value.name}</option>
                                            }
                                          })
                                          }                                   
            </select>
          </div>
          :''}
          {this.state.selectanalysisType === "Correlation Analysis" ?
          <div className="select-box">
          <label>Select Range</label>           
           <input className="text-box" type="text" name="title" value={this.state.textLowRange} maxLength="5" onChange={this.lowRangeChange.bind(this)}/>
           TO
           <input className="text-box" type="text" name="title" value={this.state.textHiRange} maxLength="5" onChange={this.hiRangeChange.bind(this)}/>
           <button className="btn-submit"  onClick={this.correlationSubmit}><i className="fa fa-arrow-circle-right fa-lg"></i> Submit </button>
          </div>
          
          
          :''}
        </div>
        {(this.state.showChart==='2' || this.state.showChart==='6' && this.state.biVari !== "both")?
        <div className="filter">
{this.state.selectanalysisType === "Univariate Analysis"?
        <div className="select-box">
            <label>Value Type</label>
            <select className="form-control p-0 option-bg" id="" name="" onChange={(e)=>{this.barValTypeChange(e)}}>
            <option  key ={"default"} value={"please Select"}>Please Select</option>
            {             this.state.valueTypes.map((value) =>{
                                        return <option  key ={value} value={value}>{value}</option>
                                    })
                      }                                   
            </select>
          </div>:''}
          {this.state.selectanalysisType === "Univariate Analysis" || (this.state.selectanalysisType === "Multivariate Analysis" && this.state.multiVar === "num" )?
          <div className="select-box">
            <label>{this.state.showChart==='6'?'Histogram Bin':'Bin Range'}</label>           
             <input type="text" name="title" value={this.state.textBinRange} maxLength="15" onChange={this.binRangeChange.bind(this)} onBlur={(e)=>this.binRangeChangeBlur(e)}/>
          </div>:''}              
          </div>
          :''}
        {
        ( this.state.showChart ==='3' || (( this.state.showChart ==='2' || this.state.showChart ==='4' || this.state.showChart ==='5' )&&(this.state.biVari === "both" || this.state.multiVar === "both") ))?
        <div className="filter">
            <div className="select-box">
                <label>Value Type</label>
                <select className="form-control p-0 option-bg" id="" name="" onChange={(e)=>{this.horizonValTypeChange(e)}}>
                          <option  key ={"default"} value={"please Select"}>Please Select</option>
                      {      
                      this.state.biVari !== "both" || this.state.multiVar !== "both" ? 
                                 this.state.horizonValueType.map((value) =>{
                                        return <option  key ={value} value={value}>{value}</option>
                                    })
                                :
                                this.state.bivarValueType.map((value,index) =>{
                                 if( this.state.showChart==='4' && this.state.analysisTypes == "bivariate Analysis") {
                                    return index === 2 && <option  key ={value} value={value}>{value}</option>
                                  }
                                  else{
                                    return index <= 1 && <option  key ={value} value={value}>{value}</option>
                                  }
                                 
                              })
                      }                                        
                </select>
              </div>
          </div>
          :''}
          {
            this.state.selectanalysisType === "Multivariate Analysis" && (this.state.multiVar === "cat" ||  this.state.multiVar === "both") && this.state.showChart !=='7'?
            <div className="filter">
            { this.state.multiVar === "cat" ? this.getSelectRenderList(this.state.mulitiVarList) : ""}
           { this.state.multiVar != "num" ?<div className="select-box">
                <label>groupBy : </label>
                <select className="form-control p-0 option-bg" id="groupBy" name="groupBy" onChange={(e)=>{this.selectMultiVariable(e)}}>
                      <option  key ={"default"} value={"please Select"}>Please Select</option>
                  {             this.state.variableTypes.map((value) =>{
                                              return <option  key ={value} value={value}>{value}</option>
                                          })
                            }                                   
                </select>
            </div>: ""}
            </div>
            :
            ""
          }
          {this.state.showChart==='' && this.state.selectanalysisType == ""?
          <div className="welcomtxt">
            Go from data to insights in minutes

           <p>Please select</p> 
          </div>:
        <div className="chart-content">
          
          <div className="scroll-div" >         
            {this.state.showChart==='1'? <Scatter data={this.state.selectanalysisType === "Bivariate Analysis"?this.state.scatterBiVarData:this.state.scatterData} options={this.state.selectanalysisType === "Bivariate Analysis"?this.state.scatterBivarOption:this.state.scatterOption}/>:''}
            {this.state.showChart==='2'? this.state.selectanalysisType === "Multivariate Analysis" && (this.state.multiVar === "both")?  <Bar data={this.state.mixedData} options={this.state.mixedOption}/>: <Bar data={this.state.barData} options={this.state.barOption}/>:''}
            {this.state.showChart==='3'? <HorizontalBar data={this.state.horizontalData} options={this.state.horizontalOption}/>:''}
            {this.state.showChart==='4'? <Bar data={this.state.mixedData} options={this.state.mixedOption} plugins={this.state.mixedPlugins}/>:''}
            {this.state.showChart==='5'? ( this.state.selectanalysisType === "Multivariate Analysis" && this.state.multiVar === "both")?<Line data={this.state.mixedData} options={this.state.mixedOption}/> : (this.state.selectanalysisType === "Bivariate Analysis" && this.state.biVari === "both" )?<Line data={this.state.bothLineData} options={this.state.bothLineOption}/>: 
            //<Bar data={this.state.lineData} options={this.state.lineOption}/>
            <Chart
  //width={'8000px'}
  height={'400px'}
  chartType="LineChart"
  loader={<div>Loading Chart</div>}
  data={this.state.lineData}

  options={{ 
    width: '180%',
 //   legend: { position: 'left', alignment: 'end' },  
// explorer: { actions: ['dragToZoom', 'rightClickToReset'] },
    chartArea: {
        left: "3%",
    }, 
    hAxis: {
      title: '',
      baselineColor: 'red'
    },
    vAxis: {
      title: '',
      gridlines: {
        color: 'transparent'
    },
    baselineColor: 'red'
    },   
    series: {
      1: { curveType: 'function' },
      0: { lineWidth: 8 }
    },
  }}
  rootProps={{ 'data-testid': '2' }}
/>:''}
           
{
  this.state.selectanalysisType === "Correlation Analysis" ? 

      //  <div style={{background:'red',display:"block"}}>
      //    <div style={{display:"inline-block"}} id="legend"></div>
      //       <div style={{display:"inline-block",float:"left"}} id="container"></div>
      //   </div>
    //   <HeatMap
    //   xLabels={this.state.xLabelsHeat}
    //   yLabels={this.state.yLabelsHeat}      
    //   data={this.state.heatData}
    // //  xLabelWidth={100}  
    
    //   squares
    //   cellStyle={(background, value, min, max, data, x, y) => ({
    //     background: `rgba(50, 159, 255, ${1 - (max - value) / (max - min)})`,
    //     fontSize: "11px",
    //   })}
    //  // yLabelTextAlign="right"
    //   cellRender={value => value && `${value}`}
    //   title={(value, unit, index) => value && `${this.state.xLabelsHeat[index]} - ${value}% `}
    // />

    <HeatMapComponent id='heatmap-container' titleSettings={{
    //  text: 'Olympic Medal Achievements of most Successful Countries',
      // textStyle: {
      //     size: '15px',
      //     fontWeight: '500',
      //     fontStyle: 'Normal',
      //     fontFamily: 'Segoe UI'
      // }
  }} xAxis={{
      labels: this.state.xLabelsHeat,
      labelRotation: 90,
      labelIntersectAction: 'None',
  }} yAxis={{
    //  title: { text: 'Olympic Year' },
      labels:this.state.yLabelsHeat,
  }} dataSource={this.state.heatData} dataSourceSettings={{
      isJsonData: true,
      adaptorType: 'Table',
      xDataMapping: 'Region',
  }} 
  // paletteSettings={{
  //     palette: [{ color: '#F0C27B' },
  //         { color: '#4B1248' }
  //     ]
  // }} 
  // cellSettings={{
  //     width:10,
  //     border: {
  //         width: 1,
  //         radius: 2,
  //         color: 'white'
  //     }
  // }}  
  tooltipRender={this.tooltipTemplate}>
    <Inject services={[Tooltip,Legend,]}/>
              </HeatMapComponent> :
    ""
}
           
            </div>
            {this.state.showChart==='6'? <div style={{display: "flex",flexWrap:'wrap'}}> 
             {this.state.mulitiVarList.length > 0  ? 
             this.state.histogramGraphList:''} 
              </div>
          :''}
                {this.state.showChart==='7'? <div style={{display: "flex",flexWrap:'wrap'}}> 
             {this.state.mulitiVarList.length > 0  ? 
             this.state.freqDistribution:''}
             </div>
          :''}
        </div>
        }
      </div>
    );
  }
}