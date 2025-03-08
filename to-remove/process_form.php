<?php
// Set error reporting for development (should be turned off in production)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Define variables and initialize with empty values
$success = false;
$error_message = '';
$form_data = [];

// Function to sanitize input data
function sanitize_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// Check if the form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Get the form type from hidden field
    $form_type = isset($_POST['form_type']) ? sanitize_input($_POST['form_type']) : '';
    
    // Process booking form
    if ($form_type === 'booking') {
        // Validate and collect booking form data
        $required_fields = [
            'first_name', 'last_name', 'email', 'phone',
            'arrival_date', 'departure_date', 'address', 'city', 'zip'
        ];
        
        $missing_fields = [];
        
        // Check all required fields are present
        foreach ($required_fields as $field) {
            if (empty($_POST[$field])) {
                $missing_fields[] = $field;
            } else {
                $form_data[$field] = sanitize_input($_POST[$field]);
            }
        }
        
        // Collect additional optional fields
        $optional_fields = [
            'delivery_notes', 'card_name', 'card_number', 'expiry', 'cvv',
            'add_on_1', 'add_on_2', 'add_on_3', 'add_on_4'
        ];
        
        foreach ($optional_fields as $field) {
            if (isset($_POST[$field])) {
                $form_data[$field] = sanitize_input($_POST[$field]);
            }
        }
        
        // Add selected kit from hidden field
        $form_data['selected_kit'] = isset($_POST['selected_kit']) ? sanitize_input($_POST['selected_kit']) : 'Professional Chef\'s Kit';
        
        // Validate email
        if (!filter_var($form_data['email'], FILTER_VALIDATE_EMAIL)) {
            $error_message = "Invalid email format";
        }
        // Check if any required fields are missing
        else if (!empty($missing_fields)) {
            $error_message = "Please fill in all required fields: " . implode(', ', $missing_fields);
        }
        // Validate dates
        else if (strtotime($form_data['arrival_date']) >= strtotime($form_data['departure_date'])) {
            $error_message = "Departure date must be after arrival date";
        }
        // All validations passed
        else {
            // In a real application, you would:
            // 1. Process payment
            // 2. Store booking in database
            // 3. Send confirmation emails
            // 4. Generate booking reference
            
            // For this demo, we'll simulate a successful booking
            $success = true;
            $booking_reference = 'KL' . strtoupper(substr(md5(uniqid(rand(), true)), 0, 8));
            $form_data['booking_reference'] = $booking_reference;
            
            // Log the booking (in production, this would go to a database)
            $log_entry = date('Y-m-d H:i:s') . " - New booking: " . $booking_reference . " - " . 
                          $form_data['first_name'] . " " . $form_data['last_name'] . " - " . 
                          $form_data['email'] . " - Kit: " . $form_data['selected_kit'] . "\n";
            
            file_put_contents('bookings_log.txt', $log_entry, FILE_APPEND);
            
            // Redirect to confirmation page
            header("Location: confirmation.html?ref=" . $booking_reference);
            exit();
        }
    }
    // Process contact form
    else if ($form_type === 'contact') {
        // Validate and collect contact form data
        $required_fields = ['name', 'email', 'subject', 'message'];
        $missing_fields = [];
        
        // Check all required fields are present
        foreach ($required_fields as $field) {
            if (empty($_POST[$field])) {
                $missing_fields[] = $field;
            } else {
                $form_data[$field] = sanitize_input($_POST[$field]);
            }
        }
        
        // Validate email
        if (!filter_var($form_data['email'], FILTER_VALIDATE_EMAIL)) {
            $error_message = "Invalid email format";
        }
        // Check if any required fields are missing
        else if (!empty($missing_fields)) {
            $error_message = "Please fill in all required fields: " . implode(', ', $missing_fields);
        }
        // All validations passed
        else {
            // In a real application, you would:
            // 1. Store message in database
            // 2. Send notification email to staff
            // 3. Send confirmation email to customer
            
            // For this demo, we'll simulate a successful submission
            $success = true;
            $reference = 'MSG' . strtoupper(substr(md5(uniqid(rand(), true)), 0, 8));
            
            // Log the contact message (in production, this would go to a database)
            $log_entry = date('Y-m-d H:i:s') . " - New contact: " . $reference . " - " . 
                          $form_data['name'] . " - " . $form_data['email'] . 
                          " - Subject: " . $form_data['subject'] . "\n";
            
            file_put_contents('contact_log.txt', $log_entry, FILE_APPEND);
            
            // Return success message
            $form_data['reference'] = $reference;
        }
    }
    // Unknown form type
    else {
        $error_message = "Unknown form type";
    }
}

// Return JSON response for AJAX requests
if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
    header('Content-Type: application/json');
    echo json_encode([
        'success' => $success,
        'error' => $error_message,
        'data' => $form_data
    ]);
    exit();
}
?>