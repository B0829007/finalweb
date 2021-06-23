import './date.css'
import 'react-datepicker/dist/react-datepicker.css'
import DatePicker from 'react-datepicker'
import React from 'react'
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button,Card,Container,Row,Col } from 'react-bootstrap'
import axios from  'axios';

const TWregion = [
    { value:'臺北市' , label: '臺北市'},
    { value:'新北市' , label: '新北市'},
    { value:'臺中市' , label: '臺中市'},
    { value:'臺南市' , label: '臺南市'},
    { value:'桃園市' , label: '桃園市'},
    { value:'高雄市' , label: '高雄市'},

];

function customTheme(theme){
    return{
        ...theme,
        colors:{
            ...theme.colors,
            primary25: 'orange',
            primary:'green',
        },
    };
}

class Pick extends React.Component {

    constructor(props){
        super(props)

        this.state={
            startDate: undefined,
            selectedOption:"",
            number:0,
        }
    }

    handleChange = selectedOption => {
        this.setState({selectedOption});
    }

    setStartDate = (date) => {
        this.setState({startDate: date});
    }

    customDateInputField = ({value,onClick}) =>(
        <button className="date-button-style" onClick={onClick}>
            {(value)? value:"Select start date"}
        </button>
    )

    handleSubmit = (e) =>{
        e.preventDefault();
        console.log(this.state.startDate)
        let formData = new FormData()
        formData.append("startDate",this.state.startDate)
        const url = "https://cors-anywhere.herokuapp.com/https://final-covid.herokuapp.com/login.php";
        axios.post(url,formData)
            .then(res=>console.log(res.data))
            .catch(err => console.log(err));
            
         }
    handleClick = (e) =>{
        e.preventDefault();
        console.log(this.state.selectedOption.value)
        let formData = new FormData()
        formData.append("city",this.state.selectedOption.value)
        // const url = "https://cors-anywhere.herokuapp.com/https://final-covid.herokuapp.com/login.php";
        const url = "http://localhost/final-covid/area.php";
        axios.post(url,formData)
            .then(res=>{
                this.state.number=res.data[0].number
                console.log(res.data)})
            .catch(err => console.log(err));
    }

    render(){
    return (
        <>
        <Container>
        <Row>
        <Col>
            <Card className="mb-4" style={{ color: "#000" }}>
                <Card.Body>
                    <Card.Title>
                        COVID-19 統計資料
                    </Card.Title>
                    <Card.Text>
                        請選擇想知道的資料 按下確定查看
                    </Card.Text>
                </Card.Body>
            </Card>
            </Col>
        </Row>
        <Row>
        
            {/* <Col>
            <Card className="mb-4" style={{ color: "#000" }}>
                <Card.Body>
                    <Card.Title>
                        Please Select A Date
                    </Card.Title>
                    <Card.Text>
                        臺灣單日確診數
                    </Card.Text>
                    <div className="Date">
                    <DatePicker
                            startDate={this.state.startDate}
                            selected={this.state.startDate}
                            onChange={this.setStartDate}
                            todayButton="Today"
                            isClearable

                            dateFormat="Y/MMMM/dd"

                            minDate={new Date("2021/April/01")}
                            maxDate={new Date()}
                            

                            customInput={<this.customDateInputField/>}
                        />
                    </div>
                    <div>
                    <Button variant="primary"
                    onClick={this.handleSubmit}>確定</Button>
                    </div>
                </Card.Body>
            </Card>
            </Col> */}
            <Col>
            <Card className="mb-4" style={{ color: "#000" }}>
                <Card.Body>
                    <Card.Title>
                        Please Select A Region
                    </Card.Title>
                    <Card.Text>
                        臺灣各縣市 累積確診數
                    </Card.Text>
                    <Select
                        theme={customTheme}
                        value={this.state.selectedOption}
                        onChange={this.handleChange}
                        options={TWregion}
                        className="mb-3"
                        placeholder="請選擇一個縣市"
                        isSearchable
                        isClearable
                    />
                    <Button variant="primary"
                    onClick={this.handleClick}>確定</Button>
                </Card.Body>
            </Card>
            </Col>
            </Row>
            <Row>
        <Col>
            <Card className="mb-4" style={{ color: "#000" }}>
                <Card.Body>
                    <Card.Title>
                        統計結果
                    </Card.Title>
                    <Card.Text >
                    { this.state.number}
                
                    </Card.Text>
                </Card.Body>
            </Card>
            </Col>
        </Row>
            </Container>
            
        </>
    );
    }
}

export default Pick