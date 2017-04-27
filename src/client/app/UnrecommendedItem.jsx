import React from 'react';
import { connect } from 'react-redux';
import { Table } from 'semantic-ui-react'

function UnrecommendedItem(props) {
	const trail = props.trail;
  return (
		<Table.Row>
      <Table.Cell textAlign='center' width={3}>{trail.name}</Table.Cell>
      <Table.Cell textAlign='center' width={1}>{trail.length === 0 ? 'Unknown' : trail.length}</Table.Cell>
      <Table.Cell width={16}>{trail.description.replace(/<[^>]+>/g, '')}</Table.Cell>
    </Table.Row>
  );
}

export default UnrecommendedItem