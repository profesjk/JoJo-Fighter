import { Grid, GridItem } from "@chakra-ui/react";
import { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, BarChart, Bar, AreaChart, Area } from 'recharts';

// we will use mockup data for now
// get real data from the backend once we have users

const data = [
  {
    name: '7/1/24',
    served: 19000,
  },
  {
    name: '8/1/24',
    served: 25000,
  },
  {
    name: '9/1/24',
    served: 22000,
  },
  {
    name: '10/1/24',
    served: 35000,
  },
  {
    name: '11/1/24',
    served: 36000,
  },
];

class LineDisplay extends PureComponent {
  static demoUrl = 'https://codesandbox.io/p/sandbox/line-chart-width-xaxis-padding-8v7952';

  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis dataKey="served" domain={['dataMin', 'dataMax']} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="served" stroke="#86EA8A" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}

const data02 = [
  {
    "name": "Nuts",
    "value": 16,
    "fill": "#86EA8A"
  },
  {
    "name": "Processed Food",
    "value": 23,
    "fill": "#5DD362"
  },
  {
    "name": "Dairy Products",
    "value": 22,
    "fill": "#45B876"
  },
  {
    "name": "Meat & Poultry",
    "value": 28,
    "fill": "#3B963F"
  },
  {
    "name": "Fruits & Vegetables",
    "value": 11,
    "fill": "#356E36"
  }
];

const pieColors = ["#86EA8A", "#5DD362", "#45B876", "#3B963F", "#356E36"];

class PieDisplay extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/pie-chart-with-padding-angle-7ux0o';

  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={800} height={400}>
          <Pie
            data={data02}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({
              cx,
              cy,
              midAngle,
              innerRadius,
              outerRadius,
              value,
              index
            }) => {
              const RADIAN = Math.PI / 180;
              // eslint-disable-next-line
              const radius = 25 + innerRadius + (outerRadius - innerRadius);
              // eslint-disable-next-line
              const x = cx + radius * Math.cos(-midAngle * RADIAN);
              // eslint-disable-next-line
              const y = cy + radius * Math.sin(-midAngle * RADIAN);

              return (
                <text
                  x={x}
                  y={y}
                  fill={pieColors[index]}
                  textAnchor={x > cx ? "start" : "end"}
                  dominantBaseline="central"
                >
                  {value}
                </text>
              );
            }}
            innerRadius={"60%"}
            outerRadius={"70%"}
            dataKey="value"
          />
          <Legend align="left" verticalAlign="middle" width={170} />
        </PieChart>
      </ResponsiveContainer>
    );
  }
}

const data03 = [
  {
    "name": "Location A",
    "donation_value": 13.5,
  },
  {
    "name": "Location B",
    "donation_value": 9.5,
  },
  {
    "name": "Location C",
    "donation_value": 15.5,
  },
  {
    "name": "Location D",
    "donation_value": 12.5,
  }
];

class BarDisplay extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/synchronized-line-charts-4z3og';

  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data03}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="donation_value" fill="#86EA8A" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}

const data04 = [
  {
    name: '7/1/24',
    "emission_reduced": 300,
  },
  {
    name: '8/1/24',
    "emission_reduced": 1000,
  },
  {
    name: '9/1/24',
    "emission_reduced": 900,
  },
  {
    name: '10/1/24',
    "emission_reduced": 1350,
  },
  {
    name: '11/1/24',
    "emission_reduced": 1490,
  },
];

class AreaDisplay extends PureComponent {
  static demoUrl = 'https://codesandbox.io/p/sandbox/line-chart-width-xaxis-padding-8v7952';

  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={300}
          data={data04}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis dataKey="served" domain={[0, 2000]} />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="emission_reduced" stroke="#86EA8A" fillOpacity={1} fill="#86EA8A" />
        </AreaChart>
      </ResponsiveContainer>
    );
  }
}


export const Dashboard = () => {
    return (
        <Grid
          h={"100vh"}
          templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
          templateRows={{ base: "repeat(4, 1fr)", md: "repeat(2, 1fr)" }}
          gap={4}
          p={{ base: 4, md: 24 }}
          backgroundColor={"white"}
        >
          <GridItem colSpan={1} rowSpan={1}>
            <PieDisplay />
          </GridItem>
          <GridItem colSpan={1} rowSpan={1}>
            <LineDisplay />
          </GridItem>
          <GridItem colSpan={1} rowSpan={1}>
            <BarDisplay />
          </GridItem>
          <GridItem colSpan={1} rowSpan={1}>
            <AreaDisplay />
          </GridItem>
        </Grid>
    );
};