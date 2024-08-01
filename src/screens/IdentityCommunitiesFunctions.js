import React, { useState, useEffect } from 'react';
import { Text, View, Button, StyleSheet, TextInput, Image } from 'react-native';
import { supabase } from '../utils/hooks/supabase';
import { useAuthentication } from '../utils/hooks/useAuthentication';



function determinePopup()
{
    const lengthOfData = True; //call to user.coluun
    if (lengthOfData)
        console.log("WouldShowPopup");
    else
        console.log("WouldNotShowPopup");
}