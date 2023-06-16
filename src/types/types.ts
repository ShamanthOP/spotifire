import Stripe from "stripe";

export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json }
    | Json[];

export interface Database {
    public: {
        Tables: {
            customers: {
                Row: {
                    id: string;
                    stripe_customer_id: string | null;
                };
                Insert: {
                    id: string;
                    stripe_customer_id?: string | null;
                };
                Update: {
                    id?: string;
                    stripe_customer_id?: string | null;
                };
            };
            liked_songs: {
                Row: {
                    created_at: string | null;
                    song_id: number;
                    user_id: string;
                };
                Insert: {
                    created_at?: string | null;
                    song_id: number;
                    user_id: string;
                };
                Update: {
                    created_at?: string | null;
                    song_id?: number;
                    user_id?: string;
                };
            };
            prices: {
                Row: {
                    active: boolean | null;
                    currency: string | null;
                    description: string | null;
                    id: string;
                    interval:
                        | Database["public"]["Enums"]["pricing_plan_interval"]
                        | null;
                    interval_count: number | null;
                    metadata: Json | null;
                    product_id: string | null;
                    trial_period_days: number | null;
                    type: Database["public"]["Enums"]["pricing_type"] | null;
                    unit_amount: number | null;
                };
                Insert: {
                    active?: boolean | null;
                    currency?: string | null;
                    description?: string | null;
                    id: string;
                    interval?:
                        | Database["public"]["Enums"]["pricing_plan_interval"]
                        | null;
                    interval_count?: number | null;
                    metadata?: Json | null;
                    product_id?: string | null;
                    trial_period_days?: number | null;
                    type?: Database["public"]["Enums"]["pricing_type"] | null;
                    unit_amount?: number | null;
                };
                Update: {
                    active?: boolean | null;
                    currency?: string | null;
                    description?: string | null;
                    id?: string;
                    interval?:
                        | Database["public"]["Enums"]["pricing_plan_interval"]
                        | null;
                    interval_count?: number | null;
                    metadata?: Json | null;
                    product_id?: string | null;
                    trial_period_days?: number | null;
                    type?: Database["public"]["Enums"]["pricing_type"] | null;
                    unit_amount?: number | null;
                };
            };
            products: {
                Row: {
                    active: boolean | null;
                    description: string | null;
                    id: string;
                    image: string | null;
                    metadata: Json | null;
                    name: string | null;
                };
                Insert: {
                    active?: boolean | null;
                    description?: string | null;
                    id: string;
                    image?: string | null;
                    metadata?: Json | null;
                    name?: string | null;
                };
                Update: {
                    active?: boolean | null;
                    description?: string | null;
                    id?: string;
                    image?: string | null;
                    metadata?: Json | null;
                    name?: string | null;
                };
            };
            songs: {
                Row: {
                    created_at: string | null;
                    id: number;
                    image_path: string | null;
                    song_path: string | null;
                    title: string | null;
                    user_id: string | null;
                };
                Insert: {
                    created_at?: string | null;
                    id?: number;
                    image_path?: string | null;
                    song_path?: string | null;
                    title?: string | null;
                    user_id?: string | null;
                };
                Update: {
                    created_at?: string | null;
                    id?: number;
                    image_path?: string | null;
                    song_path?: string | null;
                    title?: string | null;
                    user_id?: string | null;
                };
            };
            subscriptions: {
                Row: {
                    cancel_at: string | null;
                    cancel_at_period_end: boolean | null;
                    canceled_at: string | null;
                    created: string;
                    current_period_end: string;
                    current_period_start: string;
                    ended_at: string | null;
                    id: string;
                    metadata: Json | null;
                    price_id: string | null;
                    quantity: number | null;
                    status:
                        | Database["public"]["Enums"]["subscription_status"]
                        | null;
                    trial_end: string | null;
                    trial_start: string | null;
                    user_id: string;
                };
                Insert: {
                    cancel_at?: string | null;
                    cancel_at_period_end?: boolean | null;
                    canceled_at?: string | null;
                    created?: string;
                    current_period_end?: string;
                    current_period_start?: string;
                    ended_at?: string | null;
                    id: string;
                    metadata?: Json | null;
                    price_id?: string | null;
                    quantity?: number | null;
                    status?:
                        | Database["public"]["Enums"]["subscription_status"]
                        | null;
                    trial_end?: string | null;
                    trial_start?: string | null;
                    user_id: string;
                };
                Update: {
                    cancel_at?: string | null;
                    cancel_at_period_end?: boolean | null;
                    canceled_at?: string | null;
                    created?: string;
                    current_period_end?: string;
                    current_period_start?: string;
                    ended_at?: string | null;
                    id?: string;
                    metadata?: Json | null;
                    price_id?: string | null;
                    quantity?: number | null;
                    status?:
                        | Database["public"]["Enums"]["subscription_status"]
                        | null;
                    trial_end?: string | null;
                    trial_start?: string | null;
                    user_id?: string;
                };
            };
            users: {
                Row: {
                    avatar_url: string | null;
                    billing_address: Json | null;
                    full_name: string | null;
                    id: string;
                    payment_method: Json | null;
                };
                Insert: {
                    avatar_url?: string | null;
                    billing_address?: Json | null;
                    full_name?: string | null;
                    id: string;
                    payment_method?: Json | null;
                };
                Update: {
                    avatar_url?: string | null;
                    billing_address?: Json | null;
                    full_name?: string | null;
                    id?: string;
                    payment_method?: Json | null;
                };
            };
        };
        Views: {
            [_ in never]: never;
        };
        Functions: {
            [_ in never]: never;
        };
        Enums: {
            pricing_plan_interval: "day" | "week" | "month" | "year";
            pricing_type: "one_time" | "recurring";
            subscription_status:
                | "trialing"
                | "active"
                | "canceled"
                | "incomplete"
                | "incomplete_expired"
                | "past_due"
                | "unpaid";
        };
        CompositeTypes: {
            [_ in never]: never;
        };
    };
}

/*
 ** User types
 */
export interface UserDetails {
    id: string;
    first_name: string;
    last_name: string;
    full_name?: string;
    avatar_url?: string;
    billing_address?: Stripe.Address;
    payment_method?: Stripe.PaymentMethod[Stripe.PaymentMethod.Type];
}

export interface Product {
    id: string;
    active?: boolean;
    name?: string;
    description?: string;
    image?: string;
    metadata?: Stripe.Metadata;
}

export interface Price {
    id: string;
    product_id?: string;
    active?: boolean;
    description?: string;
    unit_amount?: number;
    currency?: string;
    type?: Stripe.Price.Type;
    interval?: Stripe.Price.Recurring.Interval;
    interval_count?: number;
    trial_period_days?: number | null;
    metadata?: Stripe.Metadata;
    products?: Product;
}

export interface ProductWithPrice extends Product {
    prices?: Array<Price>;
}

export interface Subscription {
    id: string;
    user_id: string;
    status?: Stripe.Subscription.Status;
    metadata?: Stripe.Metadata;
    price_id?: string;
    quantity?: number;
    cancel_at_period_end?: boolean;
    created: string;
    current_period_start: string;
    current_period_end: string;
    ended_at?: string;
    cancel_at?: string;
    canceled_at?: string;
    trial_start?: string;
    trial_end?: string;
    prices?: Price;
}

/*
 ** Song types
 */

export interface Song {
    id: string;
    user_id: string;
    author: string;
    title: string;
    song_path: string;
    image_path: string;
}
