
import React from 'react';

export type UserRole = 'PARENT' | 'ADMIN' | 'MUNICIPAL_OFFICER';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface PreOrderData {
  id: string;
  name: string;
  organization: string;
  role: string;
  phone: string;
  email: string;
  city: string;
  quantity: string;
  useCase: string;
  status: 'pending' | 'reviewed' | 'approved';
  createdAt: string;
}

export interface ContactData {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  createdAt: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}
