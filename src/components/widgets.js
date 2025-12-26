import Card from './widgets/Card';
import Chart from './widgets/Chart';
import Table from './widgets/Table';

const components = {
    'card': Card,
    'chart': Chart,
    'table': Table
};

export const getWidget = (type) => {
    return components[type] || null;
};
