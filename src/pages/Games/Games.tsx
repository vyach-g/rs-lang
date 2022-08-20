import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function Games() {
  return (
    <div>
      <Link to="sprint">sprint</Link>
      <Link to="audiocall">audiocall</Link>

      <Outlet />
    </div>
  );
}
