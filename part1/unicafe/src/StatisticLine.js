const StatisticLine = ({ text, value, suffix }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>
        {value} {suffix}
      </td>
    </tr>
  );
};

export default StatisticLine;
