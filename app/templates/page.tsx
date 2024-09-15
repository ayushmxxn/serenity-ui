import Navbar from '@/components/serenitypro/Navbar';
import Section from '@/components/serenitypro/Section';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Templates",
};

function TemplatesPage() {
  return (
    <div>
      <Navbar/>
      <Section/>
    </div>
  )
}

export default TemplatesPage;
